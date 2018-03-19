app.controller('DirectionsController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$interval', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $interval, $rootScope) {
  $scope.lat_lng = $state.params.lat_lng;
  $scope.user_lv = $state.params.user;
  $scope.fixid = $state.params.id;
  var marker_tec = 'file:///android_asset/www/img/workshop.png';

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
        var request = $http({
          method: "post",
          url: "http://61.91.124.155/repairservice_api/gettec_lat_lng.php",
          crossDomain: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            fixid: $scope.fixid
          },
        });

        request.success(function(data) {
          $scope.data_tec = data.lat_lng;
          angular.forEach($scope.data_tec, function(a, k) {
            $scope.tec_lat = a.tec_lat;
            $scope.tec_lng = a.tec_lng;
          });
          var tec_lat_lng = {
            lat: parseFloat($scope.tec_lat),
            lng: parseFloat($scope.tec_lng)
          };
          var originMarker = new google.maps.Marker({
            position: myLatlng,
            map: map
          });
          var destinationMarker = new google.maps.Marker({
            position: tec_lat_lng,
            map: map,
            icon: marker_tec
          });

          var directionsRequest = {
            origin: myLatlng,
            destination: tec_lat_lng,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
          };

          directionsService.route(directionsRequest, function(response) {
            new google.maps.DirectionsRenderer({
              map: map,
              directions: response,
              suppressMarkers: true
            });
          });
        });

      } else if ($scope.user_lv == 2) {

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

      }

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
