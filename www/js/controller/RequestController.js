app.controller('RequestController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading,$rootScope) {
	$scope.tec_id = $state.params.tec_id;

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

}])
