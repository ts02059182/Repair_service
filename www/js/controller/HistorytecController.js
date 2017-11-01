app.controller('HistorytecController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $rootScope) {

  var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/gethistorytec.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          username: $rootScope.username,
          password: $rootScope.password
        },
      });

      request.success(function(response) {
        $scope.service = response.service; 
      });
    

  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.currentStateName() == 'menutec.historytec') {
      //event.preventDefault();
      return false;
    } else {
      $ionicHistory.goBack();
    }
  }, 101);

}])
