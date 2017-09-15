app.controller('MasterController', ['$scope','$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', function($scope,$cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams) {

    window.cordovaOauth = $cordovaOauth;
    window.http = $http;

  $scope.toregister = function() {

    $state.go('register')

  }

  $scope.login = function()
{
    facebookLogin(window.cordovaOauth, window.http);
}

  function facebookLogin($cordovaOauth, $http){
    //$cordovaOauth.facebook("1627485283949175", ["email", "public_profile"], {redirect_uri: "http://localhost/callback"}).then(function(result){
    $cordovaOauth.facebook("1627485283949175", ["public_profile"]).then(function(result) {    
        $scope.access_token=result.access_token;
        $http.get("https://graph.facebook.com/v2.2/me?access_token="+$scope.access_token+"").success(function (response) {
            $scope.fbid = response.id;
            $scope.name = response.name;
            $state.go('menu.home');
        });
    },  function(error){
            console.log("Error: " + error);
    });
    };

  $scope.tologin = function(userdata, userpassword) {
    if (userdata == undefined) {
      alert("please input username");
    } else if (userpassword == undefined) {
      alert("please input password");
    } else {

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
        if (data > 0) {

          $state.go('menu.home');
        } else {
          $ionicPopup.alert({
            title: 'Login Failure',
            template: 'You have failed to log in. Please try again.'
          });
        }

      });

    }

  }


}])
