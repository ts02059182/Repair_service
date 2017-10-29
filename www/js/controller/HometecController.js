app.controller('HometecController', ['$scope','$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', function($scope,$cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading) {

window.cordovaOauth = $cordovaOauth;
    window.http = $http;

  $scope.username = $state.params.username;
   $scope.password = $state.params.password;

  
   


 $scope.toonline = function() {
 		$scope.online = 'online';
      var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/tec_status.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          username: $scope.username,
          password: $scope.password,
          status:  $scope.online
        },
      });

      request.success(function(data) {
      	// console.log(data);
        if (data == 0) {
          alert('fail');
        } else {
          alert($scope.online);
        }

        

      });

    }

$scope.tobusy = function() {
 		$scope.online = 'busy';
      var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/tec_status.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          username: $scope.username,
          password: $scope.password,
          status:  $scope.online
        },
      });

      request.success(function(data) {
      	// console.log(data);
        if (data == 0) {
          alert('fail');
        } else {
          alert($scope.online);
        }

        

      });

    }
    $scope.tooffline = function() {
 		$scope.online = 'offline';
      var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/tec_status.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          username: $scope.username,
          password: $scope.password,
          status:  $scope.online
        },
      });

      request.success(function(data) {
      	// console.log(data);
        if (data == 0) {
          alert('fail');
        } else {
          alert($scope.online);
        }

        

      });

    }

 
 $scope.touser = function(){
 	alert('user');
 }
 $scope.towork = function(){
 	alert('work');
 }

}])
