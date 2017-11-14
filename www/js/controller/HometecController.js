app.controller('HometecController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$interval', '$cordovaLocalNotification', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $interval, $cordovaLocalNotification , $rootScope) {

  window.cordovaOauth = $cordovaOauth;
  window.http = $http;

  

  var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/getservicetec.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          username: $rootScope.username,
          password: $rootScope.password
        },
      });

      request.success(function(response) {
        $scope.service = response.service;
        $scope.photo = response.photo;   
      });

      var url = "http://61.91.124.155/repairservice_api/upload/1509449389101.jpg";
      //$scope.imgURI1 = url;

  cordova.plugins.backgroundMode.enable();


  cordova.plugins.backgroundMode.onactivate = function() {
    var auto = $interval(function() {
      var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/getservicetec.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          username: $rootScope.username,
          password: $rootScope.password
        },
      });

      request.success(function(response) {
       
        $scope.service = response.service;
        if(response.service != null){
          cordova.plugins.notification.local.schedule({
          title: 'คุณได้รับงานใหม่',
          text: 'กรุณาทำการตอบรับงานใหม่'
        });
        }
      });

    }, 3000);
  }

 $scope.update = function(status,group) {

  

      var request = $http({
              method: "post",
              url: "http://61.91.124.155/repairservice_api/update_tecstatus.php",
              crossDomain: true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {
               
                status: status,
                fixid: group.id

              },
            });
            request.success(function(data) {
              if (data > 0) {
                $ionicPopup.alert({
                  title: 'Update Status Success',
                  template: 'You have successfully update status'
                });
              } else {
                $ionicPopup.alert({
                  title: 'Profiles Information Failure',
                  template: 'You have failed update status'
                });
              }

            });
            $state.go($state.current, {}, { reload: true });
  }






  

 




}])
