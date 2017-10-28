app.controller('HistorytecController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading) {

  

  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.currentStateName() == 'menutec.historytec') {
      //event.preventDefault();
      return false;
    } else {
      $ionicHistory.goBack();
    }
  }, 101);

}])
