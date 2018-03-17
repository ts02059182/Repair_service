app.controller('HistorytecController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $rootScope) {

  $scope.calendar = {};

  var request = $http({
    method: "post",
    url: "http://61.91.124.155/repairservice_api/gethistorytec.php",
    crossDomain: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
      username: $rootScope.username,
      password: $rootScope.password
    },
  });

  request.success(function(response) {
    $scope.service = response.service;
    $scope.calendar.eventSource = createEvents($scope.service);
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
      title: 'Job',
      scope: $scope,
      buttons: [{
          text: '<b>OK</b>',
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
              $state.go('menutec.directions', { lat_lng: lat_lng });
            }, 2000);
          }

        }
      ]
    });
  };

  function createEvents(service) {
    var events = [];
    var date = new Date();
    var startTime;
    var endTime;
    $rootScope.service = service;
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
      $scope.lat = a.lat;
      $scope.lng = a.lng;


      startTime = new Date($scope.year, $scope.month, $scope.date, $scope.hour, $scope.minutes);
      endTime = new Date($scope.year, $scope.month, $scope.date, $scope.hour + 1, $scope.minutes);

      events.push({
        title: 'Job : ' + $scope.status,
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
        lat: $scope.lat,
        lng: $scope.lng
      });

    });

    return events;
  }

  $ionicPlatform.registerBackButtonAction(function(event) {
    if ($ionicHistory.currentStateName() == 'menutec.historytec') {
      //event.preventDefault();
      return false;
    } else {
      $ionicHistory.goBack();
    }
  }, 101);

}])
