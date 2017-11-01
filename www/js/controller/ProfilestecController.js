app.controller('ProfilestecController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $rootScope) {

  var request = $http({
    method: "post",
    url: "http://61.91.124.155/repairservice_api/getprofile_tec.php",
    crossDomain: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
      username: $rootScope.username,
      password: $rootScope.password
    },
  });

  request.success(function(response) {
    $scope.profile = response.profile;
  });

  $scope.toedit = function(group) {
    $scope.Edit = {};
    $scope.Editdata = {};
    $scope.cusid = group.id;
    $scope.fname = group.fname;
    $scope.lname = group.lname;
    $scope.phoen = group.phone;
    $scope.email = group.email;

    $ionicPopup.show({
      template: '<form name="myform"> <div class="list padding hint"><ion-item class="item-floating-label" style="background: White ; margin-top: 2%;" ng-repeat="group in profile" ng-if="group.id == cusid "> <span class="input-label">First Name</span> <input type="text" name="name" placeholder="First Name" ng-model="Editdata.name" ng-init="Editdata.name = group.fname"> </ion-item> <ion-item class="item-floating-label" style="background: White ; margin-top: 2%;" ng-repeat="group in profile" ng-if="group.id == cusid "> <span class="input-label">Last Name</span> <input type="text" name="lname" placeholder="Last Name" ng-model="Editdata.lname" ng-init="Editdata.lname = group.lname"> </ion-item> <ion-item class="item-floating-label" style="background: White ; margin-top: 2%;" ng-repeat="group in profile" ng-if="group.id == cusid "> <span class="input-label">Phone</span> <input type="text" name="phone" placeholder="Phone" ng-model="Editdata.phone" ng-init="Editdata.phone = group.phone"> </ion-item> <ion-item class="item-floating-label" style="background: White ; margin-top: 2%;" ng-repeat="group in profile" ng-if="group.id == cusid "> <span class="input-label">Email</span> <input type="text" name="email" placeholder="Email" ng-model="Editdata.email" ng-init="Editdata.email = group.email"> </ion-item></div> </form>',
      title: 'Edit Profiles info',
      scope: $scope,
      buttons: [
        { text: '<b>Cancel</b>' }, {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            
            var request = $http({
              method: "post",
              url: "http://61.91.124.155/repairservice_api/editprofile.php",
              crossDomain: true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {
                name: $scope.Editdata.name,
                lname: $scope.Editdata.lname,
                phone: $scope.Editdata.phone,
                email: $scope.Editdata.email,
                id: group.id

              },
            });
            request.success(function(data) {
              if (data > 0) {
                $ionicPopup.alert({
                  title: 'Profiles Information Success',
                  template: 'The Profiles information has been successfully Edited'
                });
              } else {
                $ionicPopup.alert({
                  title: 'Profiles Information Failure',
                  template: 'The Profiles information has been unsuccessfully Edited'
                });
              }

            });
            $state.go($state.current, {}, { reload: true });

          }
        }
      ]
    });

  }


  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.currentStateName() == 'menutec.Profilestec') {
      //event.preventDefault();
      return false;
    } else {
      $ionicHistory.goBack();
    }
  }, 101);

}])
