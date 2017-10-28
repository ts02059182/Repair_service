app.controller('HometecController', ['$scope','$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', function($scope,$cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading) {

  $scope.username = $state.params.username;
   $scope.password = $state.params.password;

  //  alert($scope.username);
	// $scope.tomap = function() {

	// 	$ionicLoading.show({
 //            content: 'Loading',
 //            animation: 'fade-in',
 //            showBackdrop: true,
 //            maxWidth: 200,
 //            showDelay: 0
 //          });

	// 	// $timeout(function () {
 //  //   		$state.go('menu.map');
 //  //   	  }, 2000);

 //  }

 $scope.toonline = function(){
 	alert('online');
 }
 $scope.tobusy = function(){
 	alert('busy');
 }
 $scope.tooffline = function(){
 	alert('offline');
 }
 $scope.touser = function(){
 	alert('user');
 }
 $scope.towork = function(){
 	alert('work');
 }

}])
