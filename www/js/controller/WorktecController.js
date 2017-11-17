app.controller('WorktecController', ['$scope', '$cordovaOauth', '$state', '$http', '$cordovaNetwork', '$ionicPlatform', '$location', '$ionicHistory', '$ionicPopup', '$cordovaCamera', '$cordovaDevice', '$stateParams', '$timeout', '$ionicLoading', '$rootScope', function($scope, $cordovaOauth, $state, $http, $cordovaNetwork, $ionicPlatform, $location, $ionicHistory, $ionicPopup, $cordovaCamera, $cordovaDevice, $stateParams, $timeout, $ionicLoading, $rootScope) {
  $scope.tec_id = $state.params.tec_id;
  $scope.calendar = {};

  var request = $http({
    method: "post",
    url: "http://61.91.124.155/repairservice_api/getworktec.php",
    crossDomain: true,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: {
      tec_id: $scope.tec_id
    },
  });

  request.success(function(response) {
    $scope.service = response.service;
    $scope.calendar.eventSource = createEvents($scope.service);
  });

  $scope.onViewTitleChanged = function(title) {
    $scope.viewTitle = title;
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
        appointment: $scope.appointment
      });

    });

    return events;
  }

  $scope.request = function() {

      $state.go('menu.request', { tec_id: $scope.tec_id });
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
