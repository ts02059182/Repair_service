app.controller('MapController', ['$scope','$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$ionicLoading', '$compile', function($scope,$cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $ionicLoading, $compile,$cordovaGeolocation) {

  $ionicPlatform.ready(function() {    
 


        navigator.geolocation.getCurrentPosition(onSuccess, onError);

        function onSuccess(position) {
        latvalue = position.coords.latitude;
        lngvalue = position.coords.longitude;
        timestamp = position.timestamp;
        var myLatlng = new google.maps.LatLng(latvalue, lngvalue);
             
            var mapOptions = {
                center: myLatlng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };          
             
            var map = new google.maps.Map(document.getElementById("map"), mapOptions);          
             
            $scope.map = map;

    }

    function onError(error) {
        alert(error);
    }
 
       
    });

}])
