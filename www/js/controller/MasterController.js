app.controller('MasterController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$rootScope', '$ionicLoading', '$timeout', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $rootScope, $ionicLoading, $timeout) {

  window.cordovaOauth = $cordovaOauth;
  window.http = $http;


  $scope.toregister = function() {

    $state.go('register')

  }

  $scope.login = function() {
    facebookLogin(window.cordovaOauth, window.http);
  }

  function facebookLogin($cordovaOauth, $http) {
    $ionicLoading.show({
          content: 'Loading',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
    $cordovaOauth.facebook("1627485283949175", ["public_profile"]).then(function(result) {
      $scope.access_token = result.access_token;
      $http.get("https://graph.facebook.com/v2.2/me?access_token=" + $scope.access_token + "").success(function(response) {

        

        $rootScope.fbid = response.id;
        $rootScope.fbname = response.name;
        $rootScope.username = $scope.fbid;
        $rootScope.password = $scope.fbid;
        
        var request = $http({
          method: "post",
          url: "http://61.91.124.155/repairservice_api/loginfacebook.php",
          crossDomain: true,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          data: {
            fbid: $scope.fbid
          },
        });


        request.success(function(data) {
          if (data == 2) {
            $timeout(function() {
              $ionicLoading.hide();
              $state.go('menu.home');
            }, 3000);
          } else if (data == 3) {
            $timeout(function() {
              $ionicLoading.hide();
              $state.go('menutec.hometec');
            }, 3000);
          } else if (data == 0) {
            $timeout(function() {
              $ionicLoading.hide();
              $state.go('updateprofile');
            }, 3000);
          }
        });


      });
    }, function(error) {
      console.log("Error: " + error);
    });
  };

  $scope.tologin = function(userdata, userpassword) {
    if (userdata == undefined) {
      alert("please input username");
    } else if (userpassword == undefined) {
      alert("please input password");
    } else {
      $rootScope.username = $scope.userdata.username;
      $rootScope.password = $scope.userpassword.password;
      var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/login.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          username: $scope.userdata.username,
          password: $scope.userpassword.password
        },
      });

      request.success(function(data) {
        if (data == 2) {
          $state.go('menu.home');
        } else if (data == 3) {
          $state.go('menutec.hometec');
        } else {
          $ionicPopup.alert({
            title: 'Login Failure',
            template: 'You have failed to log in. Please try again.'
          });
        }

      });

    }

  }

  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.currentStateName() == 'master') {
      ionic.Platform.exitApp();
      //return false;
    }
  }, 101);


}])
