app.controller('HistoryController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $rootScope) {

  $scope.calendar = {};

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
    var request1 = $http({
      method: "post",
      url: "http://61.91.124.155/repairservice_api/gethistory.php",
      crossDomain: true,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: {
        id: $scope.user_id
      },
    });

    request1.success(function(response) {
      $scope.history = response.history;
      $scope.calendar.eventSource = createEvents($scope.history);
    });
  });

  $scope.onViewTitleChanged = function(title) {
    $scope.viewTitle = title;
  };

  var template = '<div class="row">' +
        '<div class="col">' +
        '<p style="background-color: white;">' +
        '<h4>Request Detail</h4>' +
        '<div style="background-color: white;border-style: solid;border-width: 2px;">' +
        '<br> &nbsp;' +
        '<font size="2">Service : {{eventdata.service}}</font> <br><br>' +
        '&nbsp;' +
        '<font size="2">Customer Name : {{eventdata.fname}}  {{eventdata.lname}}</font> <br><br>' +
        '&nbsp;' +
        '<font size="2">Phone : {{eventdata.contact}}</font> <br><br>' +
        '&nbsp;' +
        '<font size="2">Appointment: {{eventdata.appointment}}</font> <br><br>' +
        '&nbsp;' +
        '<font size="2">Detail : {{eventdata.detail}}</font> <br><br>' +
        '&nbsp;' +
        '<font size="2">Status : {{eventdata.status}}</font> <br><br>' +
        '</div>' +
        '<br>' +
        '<h4>Price Details</h4>' +
        '<div style="background-color: white;border-style: solid;border-width: 2px;">' +
        '<br> &nbsp;' +
        '<font size="2">Equipment Detail: {{eventdata.detail_tec}}</font> <br><br>' +
        '&nbsp;' +
        '<font size="2">Equipment Price: {{eventdata.money_fix}}</font> <br><br>' +
        '&nbsp;' +
        '<font size="2">Technician Price: {{eventdata.money_tec}}</font> <br><br>' +
        '</div>' +
        '</p>' +
        '</div>' +
        '</div>';

  $scope.onEventSelected = function(event) {
    $scope.eventdata = event;
    if($scope.eventdata.status_id == 6){
      $ionicPopup.show({
      template: template,
      title: 'History',
      scope: $scope,
      buttons: [
        { text: '<b>OK</b>',
          type: 'button-positive'
        },
        {
          text: '<b>Directions</b>',
          type: 'button-positive',
          onTap: function(e) {
            $ionicLoading.show({
              content: 'Loading',
              animation: 'fade-in',
              showBackdrop: true,
              maxWidth: 200,
              showDelay: 0
            });
            var lat_lng = {
              lat: parseFloat($scope.eventdata.lat),
              lng: parseFloat($scope.eventdata.lng)
            };
            $timeout(function() {
              $state.go('menutec.directions', { lat_lng: lat_lng,user: 1,id: $scope.eventdata.id });
            }, 2000);
          }

        }
      ]
      });
    }else if($scope.eventdata.status_id == 5){
      $ionicPopup.show({
      template: template,
      title: 'History',
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
              $state.go($state.current, {}, { reload: true });
            });
          }
        },
        {
          text: '<b>Accept</b>',
          type: 'button-positive',
          onTap: function(e) {
            var request = $http({
              method: "post",
              url: "http://61.91.124.155/repairservice_api/update_tecstatus.php",
              crossDomain: true,
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              data: {
                status: 6,
                fixid: event.id
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
    }else{
      $ionicPopup.show({
      template: template,
      title: 'History',
      scope: $scope,
      buttons: [
        { text: '<b>OK</b>',
          type: 'button-positive'
        }
      ]
      });
    }
  };


  function createEvents(history) {
    var events = [];
    var date = new Date();
    var startTime;
    var endTime;
    $rootScope.history = history;
    angular.forEach(history, function(a, k) {
      $scope.service = a.service;
      $scope.detail = a.detail;
      $scope.status = a.status;
      $scope.cus_fname = a.fname;
      $scope.cus_lname = a.lname;
      $scope.contact = a.phone;
      $scope.appointment = a.appointment;
      $scope.fixid = a.fixid;
      $scope.year = parseInt(a.appointment.substr(0, 4));
      $scope.month = parseInt(a.appointment.substr(5, 2) - 1);
      $scope.date = parseInt(a.appointment.substr(8, 2));
      $scope.hour = parseInt(a.appointment.substr(11, 2));
      $scope.minutes = parseInt(a.appointment.substr(14, 2));
      $scope.lat = a.lat;
      $scope.lng = a.lng;
      $scope.cus_id = a.cus_id;
      $scope.detail_tec = a.detail_tec;
      $scope.money_fix = a.money_fix;
      $scope.money_tec = a.money_tec;
      $scope.status_id = a.status_id;


      startTime = new Date($scope.year, $scope.month, $scope.date, $scope.hour, $scope.minutes);
      endTime = new Date($scope.year, $scope.month, $scope.date, $scope.hour + 1, $scope.minutes);

      events.push({
        title: 'Status : ' + $scope.status,
        startTime: startTime,
        endTime: endTime,
        allDay: false,
        id: $scope.fixid,
        detail: $scope.detail,
        status: $scope.status,
        fname: $scope.cus_fname,
        lname: $scope.lname,
        contact: $scope.contact,
        appointment: $scope.appointment,
        service: $scope.service,
        lat: $scope.lat,
        lng: $scope.lng,
        cus_id: $scope.cus_id,
        detail_tec: $scope.detail_tec,
        money_fix: $scope.money_fix,
        money_tec: $scope.money_tec,
        status_id: $scope.status_id
      });

    });

    return events;
  }


  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.currentStateName() == 'menu.history') {
      //event.preventDefault();
      return false;
    } else {
      $ionicHistory.goBack();
    }
  }, 101);

}])
