app.controller('HometecController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$interval', '$cordovaLocalNotification', '$rootScope', '$cordovaGeolocation', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $interval, $cordovaLocalNotification, $rootScope, $cordovaGeolocation) {

  window.cordovaOauth = $cordovaOauth;
  window.http = $http;
  $scope.calendar = {};

  var posOptions = { timeout: 10000, enableHighAccuracy: false };
  $cordovaGeolocation
    .getCurrentPosition(posOptions)

    .then(function(position) {
      var lat = position.coords.latitude
      var long = position.coords.longitude

      var request = $http({
        method: "post",
        url: "http://61.91.124.155/repairservice_api/updateservicetec.php",
        crossDomain: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
          username: $rootScope.username,
          password: $rootScope.password,
          latvalue: lat,
          lngvalue: long
        },
      });

      request.success(function(response) {

      });

    }, function(err) {
      console.log(err)
    });


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
    $scope.calendar.eventSource = createEvents($scope.service, $scope.photo);
  });

  var url = "http://61.91.124.155/repairservice_api/upload/1509449389101.jpg";

  cordova.plugins.backgroundMode.enable();


  cordova.plugins.backgroundMode.onactivate = function() {
    $scope.Timer = $interval(function() {
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
        if (response.service != null) {
          cordova.plugins.notification.local.schedule({
            title: 'คุณได้รับงานใหม่',
            text: 'กรุณาทำการตอบรับงานใหม่'
          });
        }
      });

    }, 5000);
  }

  cordova.plugins.backgroundMode.ondeactivate = function() {
    $interval.cancel($scope.Timer);
  }


  $scope.onViewTitleChanged = function(title) {
    $scope.viewTitle = title;
  };

  $scope.onEventSelected = function(event) {
    
    $scope.Fixdata = {};
  



    $scope.eventdata = event;
    $ionicPopup.show({
      template: '<div class="row">' +
        '<div class="col">' +
        '<p style="background-color: white">' +
        '<div >' +
        '<font size="2">Customer Name : {{eventdata.fname}}  {{eventdata.lname}}</font> <br><br>' +
        '<font size="2">Phone : {{eventdata.contact}}</font> <br><br>' +
        '<font size="2">Appointment: {{eventdata.appointment}}</font> <br><br>' +
        '<font size="2">Detail : {{eventdata.detail}}</font> <br><br>' +
        '<font size="2">Status : {{eventdata.status}}</font> <br><br>' +
        '</div>' +
        '<img ng-repeat="groups in photo" ng-if="eventdata.id == groups.fixid " style="width: 100px;height: 100px;margin-right: 5%" ng-src="http://61.91.124.155/repairservice_api/{{groups.photo}}">' +
        '</p>' +
        '</div>' +
        '</div>',
      title: 'New Job',
      scope: $scope,
      buttons: [
        { text: '<b>Reject</b>',
          type: 'button-negative',
          onTap: function(e) {

            var request = $http({
              method: "post",
              url: "http://61.91.124.155/repairservice_api/update_tecstatus.php",
              crossDomain: true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {
                status: 3,
                fixid: event.id

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
        }, 
        { text: '<b>Accept</b>',
          type: 'button-positive',
          onTap: function(e) {

            $ionicPopup.show({
      template: '<form name="myform">' +
      '<div class="list padding hint">' +
      '<ion-item class="item-floating-label" style="background: White ; margin-top: 2%;">'+
       '<span class="input-label">Equipment Detail</span> '+
       '<input type="text" name="detail_tec" ng-model="Fixdata.detail" placeholder="Equipment Detail"> ' +
       '</ion-item>'+
       '<ion-item class="item-floating-label" style="background: White ; margin-top: 2%;">'+
       '<span class="input-label">Equipment Price</span> '+
       '<input type="number" name="moneyfix" ng-model="Fixdata.moneyfix" placeholder="Equipment Price"> ' +
       '</ion-item>'+
       '<ion-item class="item-floating-label" style="background: White ; margin-top: 2%;">'+
       '<span class="input-label">Technician Price</span> '+
       '<input type="number" name="moneytec" ng-model="Fixdata.moneytec" placeholder="echnician Price"> ' +
       '</ion-item>'+
       '</div>'+
       '</form>',

      title: 'Cost',
      scope: $scope,
      buttons: [
        { text: '<b>Send</b>',
          type: 'button-positive',
          onTap: function(e) {

          var request = $http({
              method: "post",
              url: "http://61.91.124.155/repairservice_api/update_costfix.php",
              crossDomain: true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {
                status: 5,
                fixid: event.id,
                detail_tec: $scope.Fixdata.detail,
                money_fix: $scope.Fixdata.moneyfix,
                money_tec: $scope.Fixdata.moneytec

              },
            });

               request.success(function(data) {
              if (data > 0) {
                $ionicPopup.alert({
                  title: 'Send Detail Cost Success',
                  template: 'You have successfully update Cost'
                });
              } else {
                $ionicPopup.alert({
                  title: 'Send Detail Cost Failure',
                  template: 'You have failed update Cost'
                });
              }

            });
            $state.go($state.current, {}, { reload: true });

          }
        }
      ]
    });

          }
        }
      ]
    });

  };

  function createEvents(service, photo) {
    var events = [];
    var date = new Date();
    var startTime;
    var endTime;
    $rootScope.service = service;
    $rootScope.photo = photo;
    angular.forEach(service, function(a, k) {
      $scope.detail = a.detail;
      $scope.status = a.statusName;
      $scope.cus_fname = a.cus_fname;
      $scope.cus_lname = a.cus_lname;
      $scope.contact = a.contact;
      $scope.appointment = a.appointment;
      $scope.fixid = a.id;
      $scope.year = parseInt(a.appointment.substr(0, 4));
      $scope.month = parseInt(a.appointment.substr(5, 2) - 1);
      $scope.date = parseInt(a.appointment.substr(8, 2));
      $scope.hour = parseInt(a.appointment.substr(11, 2));
      $scope.minutes = parseInt(a.appointment.substr(14, 2));


      startTime = new Date($scope.year, $scope.month, $scope.date, $scope.hour, $scope.minutes);
      endTime = new Date($scope.year, $scope.month, $scope.date, $scope.hour + 1, $scope.minutes);

      events.push({
        title: 'New Job : ' + $scope.status,
        startTime: startTime,
        endTime: endTime,
        allDay: false,
        id: $scope.fixid,
        detail: $scope.detail,
        status: $scope.status,
        fname: $scope.cus_fname,
        lname: $scope.lname,
        contact: $scope.contact,
        appointment: $scope.appointment
      });

    });

    return events;
  }

}])
