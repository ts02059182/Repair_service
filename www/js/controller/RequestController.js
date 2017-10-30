app.controller('RequestController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading,$rootScope) {
	$scope.tec_id = $state.params.tec_id;

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
	});

  document.addEventListener('deviceready', function() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    });

    function onSuccess(position) {
        latvalue = position.coords.latitude;
        lngvalue = position.coords.longitude;
        timestamp = position.timestamp;

    }

    function onError(error) {
        alert(error);
    }

  $scope.img = function(img) {

  //alert($rootScope.username);

   var options = { 
            quality : 75, 
            destinationType : Camera.DestinationType.NATIVE_URI, 
            sourceType : Camera.PictureSourceType.CAMERA, 
            allowEdit : false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 800,
            targetHeight: 600,
            popoverOptions: CameraPopoverOptions,
            correctOrientation: true,
            saveToPhotoAlbum: true

        };
        if(img==1){
            $cordovaCamera.getPicture(options).then(function(imageData) {
            	console.log(imageData);
                $scope.imgURI1 = imageData;
                $scope.nameimg1 = imageData.substr(imageData.lastIndexOf('/') + 1);
            }, function(err) {});
        }else if(img==2){
        	$cordovaCamera.getPicture(options).then(function(imageData) {
            	console.log(imageData);
                $scope.imgURI2 = imageData;
                $scope.nameimg2 = imageData.substr(imageData.lastIndexOf('/') + 1);
            }, function(err) {});	
        }else if(img==3){
        	$cordovaCamera.getPicture(options).then(function(imageData) {
            	console.log(imageData);
                $scope.imgURI3 = imageData;
                $scope.nameimg3 = imageData.substr(imageData.lastIndexOf('/') + 1);
            }, function(err) {});	
        }
        
            
  }

  $scope.confirm = function(request) {

  	var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/insertrequest.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          user: $scope.user_id,
          tec: $scope.tec_id,
          appointment: $scope.request.appointment,
          contact: $scope.request.contact,
          detail: $scope.request.contact,
          lat: latvalue,
          long: lngvalue
        },
      });

	request.success(function(data) {
		if(data > 0){
			$ionicPopup.alert({
                        title: 'Data Send Success',
                        template: 'You have successfully send request'
            });
            $state.go('menu.home');
		}else{
			$ionicPopup.alert({
                        title: 'Data Send Failure',
                        template: 'You have failed to send request'
                    });
		}
	});

  }

}])
