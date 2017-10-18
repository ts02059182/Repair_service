app.controller('MapController', ['$scope','$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', function($scope,$cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading) {

  $ionicPlatform.ready(function(timeout,ionicLoading) {
    

    var im = 'file:///android_asset/www/img/workshop.png';
    navigator.geolocation.getCurrentPosition(onSuccess, onError);

    function onSuccess(position,timeout,ionicLoading) {
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
        });

      request.success(function(response) {
        $scope.lat_long = response.lat_long;
          angular.forEach($scope.lat_long, function(a) {
            tlat = parseFloat(a.lat);
            tlong = parseFloat(a.long);

            var testLatLng = {lat: tlat, lng: tlong};
            var techMarker = new google.maps.Marker({
            position: testLatLng,
            map: map,
            icon: im
            });

            google.maps.event.addListener(techMarker, 'click', function() {
          alert('test');
        });

          });
        
        
    });


      
      

      $scope.map = map;

      $timeout(function() {
      $ionicLoading.hide();

      }, 2000);


      
    }



    function onError(error) {
      alert(error);
    }


  });



}])
