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

  $scope.onEventSelected = function(event) {
    $scope.eventdata = event;
    $ionicPopup.show({
      template: '<div class="row">' +
        '<div class="col">' +
        '<p style="background-color: white">' +
        '<div >' +
        '<font size="2">Service : {{eventdata.service}}</font> <br><br>' +
        '<font size="2">Customer Name : {{eventdata.fname}}  {{eventdata.lname}}</font> <br><br>' +
        '<font size="2">Phone : {{eventdata.contact}}</font> <br><br>' +
        '<font size="2">Appointment: {{eventdata.appointment}}</font> <br><br>' +
        '<font size="2">Detail : {{eventdata.detail}}</font> <br><br>' +
        '<font size="2">Status : {{eventdata.status}}</font> <br><br>' +
        '</div>' +
        '</p>' +
        '</div>' +
        '</div>',
      title: 'History',
      scope: $scope,
      buttons: [
        { text: '<b>OK</b>',
          type: 'button-positive'
        }
      ]
    });
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
      $scope.fixid = a.id;
      $scope.year = parseInt(a.appointment.substr(0, 4));
      $scope.month = parseInt(a.appointment.substr(5, 2) - 1);
      $scope.date = parseInt(a.appointment.substr(8, 2));
      $scope.hour = parseInt(a.appointment.substr(11, 2));
      $scope.minutes = parseInt(a.appointment.substr(14, 2));


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
        service: $scope.service
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
