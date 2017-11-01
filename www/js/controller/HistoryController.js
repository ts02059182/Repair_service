app.controller('HistoryController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $rootScope) {

  var request = $http({
    method: "post",
    url: "http://61.91.124.155/repairservice_api/getuser.php",
    crossDomain: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
      username: $rootScope.username,
      password: $rootScope.password
    },
  });

  request.success(function(data) {
    $scope.user_id = data;
    var request1 = $http({
      method: "post",
      url: "http://61.91.124.155/repairservice_api/gethistory.php",
      crossDomain: true,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        id: $scope.user_id
      },
    });

    request1.success(function(response) {
      console.log(response);
      $scope.history = response.history;
    });
  });



  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.currentStateName() == 'menu.history') {
      //event.preventDefault();
      return false;
    } else {
      $ionicHistory.goBack();
    }
  }, 101);

}])
