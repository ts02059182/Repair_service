app.controller('UpdateprofileController', ['$scope', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaDevice', '$cordovaMedia', '$timeout', '$rootScope', function($scope, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaDevice, $cordovaMedia, $timeout, $rootScope) {

  $scope.fname = $rootScope.fbname.substr(0, $rootScope.fbname.indexOf(' '));
  $scope.lname = $rootScope.fbname.substr($rootScope.fbname.indexOf(' ') + 1);



  $scope.updateprofile = function(fname, lname, email, mobile, type) {
    if (fname == undefined) {
      alert("please input name");
    } else if (lname == undefined) {
      alert("please input last name");
    } else if (email == undefined) {
      alert("please input email");
    } else if (mobile == undefined) {
      alert("please input mobile");
    } else if (type == undefined) {
      alert("please select type");
    } else {

      var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/updatefacebook.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          fbid: $scope.fbid,
          fname: fname,
          lname: lname,
          email: email,
          mobile: mobile,
          type: type
        },
      });

      request.success(function(data) {
          if (data > 0) {
              $ionicPopup.alert({
                  title: 'Update Profiles Success',
                  template: 'You have been successfully update profiles'
              });
                if(type == 2){
                    $state.go('menu.home');
                }else{
                    $state.go('menutec.hometec');
                }
          } else {
              $ionicPopup.alert({
                  title: 'Registration Failure',
                  template: 'You have been unsuccessfully update profiles'
              });
          }

      });
    }
  }


}])
