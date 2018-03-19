app.controller('DirectionsController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$interval', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $interval, $rootScope) {
  $scope.lat_lng = $state.params.lat_lng;
  $scope.user_lv = $state.params.user;
  $scope.user_ld = $state.params.id;
  var marker_tec = 'file:///android_asset/www/img/workshop.png';
  console.log($scope.user_lv);

  $scope.Timer = $interval(function() {
  navigator.geolocation.getCurrentPosition(onSuccess, onError);

  function onSuccess(position) {
    latvalue = position.coords.latitude;
    lngvalue = position.coords.longitude;
    timestamp = position.timestamp;
    var myLatlng = new google.maps.LatLng(latvalue, lngvalue);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      panControl: true,
      zoomControl: true,
      mapTypeControl: true,
      scaleControl: true,
      streetViewControl: true,
      overviewMapControl: true,
      rotateControl: true
    };

    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var directionsService = new google.maps.DirectionsService();

    if ($scope.user_lv == 1) {
      var originMarker = new google.maps.Marker({
        position: myLatlng,
        map: map
      });
      var destinationMarker = new google.maps.Marker({
        position: $scope.lat_lng,
        map: map,
        icon: marker_tec
      });
    } else if($scope.user_lv == 2){

    	var request = $http({
          method: "post",
          url: "http://61.91.124.155/repairservice_api/updateservicetec.php",
          crossDomain: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            username: $rootScope.username,
            password: $rootScope.password,
            latvalue: latvalue,
            lngvalue: lngvalue
          },
        });
         request.success(function(response) {

      });	
      var originMarker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: marker_tec
      });

      var destinationMarker = new google.maps.Marker({
        position: $scope.lat_lng,
        map: map
      });

    }

    var directionsRequest = {
      origin: myLatlng,
      destination: $scope.lat_lng,
      travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(directionsRequest, function(response) {
      new google.maps.DirectionsRenderer({
        map: map,
        directions: response,
        suppressMarkers: true
      });
    });
    $timeout(function() {
      $ionicLoading.hide();

    }, 2000);

  }
  }, 10000);


  function onError(error) {
    console.log(error);
    $timeout(function() {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);


    }, 5000);


  }


}])
