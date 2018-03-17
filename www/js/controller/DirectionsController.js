app.controller('DirectionsController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading) {
	$scope.lat_lng = $state.params.lat_lng;
	console.log($scope.lat_lng);
	
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
      var userMarker = new google.maps.Marker({
        position: myLatlng,
        map: map
      });

      var directionsRequest = {
          origin: myLatlng,
          destination: $scope.lat_lng,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        };

        directionsService.route(directionsRequest, function(response){
            new google.maps.DirectionsRenderer({
              map : map,
              directions : response,
              suppressMarkers: true
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


}])