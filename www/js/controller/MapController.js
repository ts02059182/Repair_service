app.controller('MapController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading) {

  $ionicPlatform.ready(function(timeout, ionicLoading) {
    $scope.catergory = $state.params.catergory;

    var im = 'file:///android_asset/www/img/workshop.png';
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
      var userMarker = new google.maps.Marker({
        position: myLatlng,
        map: map
      });


      var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/select_tech.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          catergory: $scope.catergory
        },
      });

      request.success(function(response) {
        $scope.lat_long = response.lat_long;
        angular.forEach($scope.lat_long, function(a, k) {
          tlat = parseFloat(a.lat);
          tlong = parseFloat(a.long);
          var infowindow = new google.maps.InfoWindow();

          var testLatLng = { lat: tlat, lng: tlong };
          var techMarker = new google.maps.Marker({
            position: testLatLng,
            map: map,
            icon: im
          });

          google.maps.event.addListener(techMarker, 'click', (function(techMarker, k) {
            return function() {
              var confirmPopup = $ionicPopup.confirm({
                title: 'Technician Info',
                template: 'Name: ' + $scope.lat_long[k].fname + '' + $scope.lat_long[k].lname + '<br>' + 'Phone: ' + $scope.lat_long[k].phone
              });

              confirmPopup.then(function(res) {
                if (res) {
                  $state.go('menu.request', { tec_id: $scope.lat_long[k].id });
                } else {

                }
              });

            }
          })(techMarker, k));



        });


      });

      $scope.map = map;

      $timeout(function() {
        $ionicLoading.hide();

      }, 2000);

    }


    function onError(error) {
      console.log(error);
      $timeout(function() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);


      }, 5000);

      
    }


  });

  $ionicPlatform.registerBackButtonAction(function(event) {

      $ionicHistory.goBack();

  }, 101);

}])
