app.controller('RegisterController', ['$scope', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaDevice', '$cordovaMedia', '$timeout', function($scope, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaDevice, $cordovaMedia,$timeout) {


    $scope.tomaster = function() {
        $state.go('master')
    }

    $scope.add_register = function(username,password,conpassword,name,lname,email,mobile) {
        if (username == undefined) {
            alert("please input username");
        } else if (password == undefined) {
            alert("please input password");
        } else if (conpassword == undefined) {
            alert("please input confirm password");
        } else if (password != conpassword) {
            alert("password that you have just filled in does not match with the previously input password");
        } else if (name == undefined) {
            alert("please input name");
        } else if (lname == undefined) {
            alert("please input last name");
        } else if (email == undefined) {
            alert("please input email");
        } else if (mobile == undefined) {
            alert("please input mobile");
        } else {
            var request = $http({
                method: "post",
                url: "http://61.91.124.155/repairservice_api/register.php",
                crossDomain: true,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                data: {
                    username: username,
                    password: password,
                    name: name,
                    lname: lname,
                    email: email,
                    mobile: mobile
                },
            });

            request.success(function(data) {
                if (data > 0) {
                    $ionicPopup.alert({
                        title: 'Registeration Success',
                        template: 'You have been successfully registered'
                    });
                    $state.go('master')
                } else {
                    $ionicPopup.alert({
                        title: 'Registration Failure',
                        template: 'You have failed to register. Please re-check the registration criteria'
                    });
                }

            });
        }
    }

}])
