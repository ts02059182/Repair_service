app.controller('RequestController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $rootScope) {
  $scope.tec_id = $state.params.tec_id;
  var i = 0;
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
      quality: 75,
      destinationType: Camera.DestinationType.NATIVE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 800,
      targetHeight: 600,
      popoverOptions: CameraPopoverOptions,
      correctOrientation: true,
      saveToPhotoAlbum: true

    };
    if (img == 1) {

      $cordovaCamera.getPicture(options).then(function(imageData) {
        
        $scope.imgURI1 = imageData;
        $scope.nameimg1 = imageData.substr(imageData.lastIndexOf('/') + 1);
      }, function(err) {});
    } else if (img == 2) {
      $cordovaCamera.getPicture(options).then(function(imageData) {
        console.log(imageData);
        $scope.imgURI2 = imageData;
        $scope.nameimg2 = imageData.substr(imageData.lastIndexOf('/') + 1);
      }, function(err) {});
    } else if (img == 3) {
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
      if (data > 0) {
        // $ionicPopup.alert({
        //   title: 'Data Send Success',
        //   template: 'You have successfully send request'
        // });
        // $ionicHistory.nextViewOptions({
        //   disableBack: true
        // });
        //  $state.go('menu.home');
        if($scope.imgURI1 != undefined){
            uploadimg(1,data);
        }
        if($scope.imgURI2 != undefined){
            uploadimg(2,data);
        }
        if($scope.imgURI3 != undefined){
            uploadimg(3,data);
        }
      } else {
        $ionicPopup.alert({
          title: 'Data Send Failure',
          template: 'You have failed to send request'
        });
      }
    });

  }

  function uploadimg(img,data) {
    if(img == 1){
      var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = $scope.nameimg1;
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            options.httpMethod = 'POST';

            var params = {};
            params.value1 = data;
            params.value2 = img;
            options.params = params;


            var ft = new FileTransfer();
            ft.upload($scope.imgURI1, "http://61.91.124.155/repairservice_api/upload.php", win, fail, options);
    }else if(img == 2){
      var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = $scope.nameimg2;
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            options.httpMethod = 'POST';

            var params = {};
            params.value1 = data;
            params.value2 = img;
            options.params = params;


            var ft = new FileTransfer();
            ft.upload($scope.imgURI2, "http://61.91.124.155/repairservice_api/upload.php", win, fail, options);
    }else if(img == 3){
      var options = new FileUploadOptions();
            options.fileKey = "file";
            options.fileName = $scope.nameimg3;
            options.mimeType = "image/jpeg";
            options.chunkedMode = false;
            options.httpMethod = 'POST';

            var params = {};
            params.value1 = data;
            params.value2 = img;
            options.params = params;


            var ft = new FileTransfer();
            ft.upload($scope.imgURI3, "http://61.91.124.155/repairservice_api/upload.php", win, fail, options);
    }

  }

  function win(r) {
    //console.log(r.response);
        if(i == 0){
        i = 1;
        $ionicPopup.alert({
          title: 'Data Send Success',
          template: 'You have successfully send request'
        });
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
         $state.go('menu.home');
      }
  }

  function fail(error) {
    alert("An error has occurred while uploading: Code = " + error.code);

  }

  $ionicPlatform.registerBackButtonAction(function(event) {
    $ionicLoading.show({
      content: 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });

    $timeout(function() {
      $ionicHistory.goBack();
    }, 2000);
  }, 101);

}])
