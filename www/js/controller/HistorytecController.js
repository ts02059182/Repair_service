app.controller('HistorytecController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading) {

    var options = { timeout: 3000, enableHighAccuracy: true  }; 
 
    document.addEventListener('deviceready', function () { 
        navigator.geolocation.getCurrentPosition(onSuccess, onError, options); 
    }); 
                 
    function onSuccess(position) { 
       
        latvalue = position.coords.latitude; 
        lngvalue = position.coords.longitude; 
        timestamp = position.timestamp;

        alert(latvalue);
        alert(lngvalue);
        alert(timestamp);

    } 

    function onError(error)  
    {
      alert(error);
   }

  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.currentStateName() == 'menutec.historytec') {
      //event.preventDefault();
      return false;
    } else {
      $ionicHistory.goBack();
    }
  }, 101);

}])
