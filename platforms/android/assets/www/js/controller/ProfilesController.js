app.controller('ProfilesController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading) {

  

  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.currentStateName() == 'menu.Profiles') {
      //event.preventDefault();
      return false;
    } else {
      $ionicHistory.goBack();
    }
  }, 101);

}])
