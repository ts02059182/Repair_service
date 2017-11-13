
var app = angular.module('starter', ['ionic', 'ngCordova','ngCordovaOauth', 'ui.router','ngAnimate','ionic.rating'])



.run(function($ionicPlatform, $ionicPopup, $cordovaNetwork) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins.Keyboard) {



                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

        });
    })

    .config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider) {

    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);

    $stateProvider
    // this state is placed in the <ion-nav-view> in the index.html
    .state('menu', {
      url: '/menu',
      abstract: true,
      templateUrl: 'views/menu.html',
      controller: 'MenuController as menu'
    })

    .state('master', {
      url: '/master',
      templateUrl: 'views/master.html',
      controller: 'MasterController',
    })
    .state('register', {
      url: '/register',
      templateUrl: 'views/register.html',
      controller: 'RegisterController',
    })

    .state('menu.home', {
        url: '/home',
        params: {
                catergory: null
        },
        views: {
          'pageContent': {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
          }
        }
      })

    .state('menu.history', {
        url: '/history',
        views: {
          'pageContent': {
            templateUrl: 'views/history.html',
            controller: 'HistoryController'
          }
        }
      })

    .state('menu.profiles', {
        url: '/profiles',
        views: {
          'pageContent': {
            templateUrl: 'views/profiles.html',
            controller: 'ProfilesController'
          }
        }
      })

     
  


    .state('menu.map', {
        url: '/map',
        params: {
                catergory: null,
                tec_id: null
        },
        views: {
          'pageContent': {
            templateUrl: 'views/map.html',
            controller: 'MapController'
          }
        }
      })

    .state('menu.request', {
        url: '/request',
        params: {
                tec_id: null
        },
        views: {
          'pageContent': {
            templateUrl: 'views/request.html',
            controller: 'RequestController'
          }
        }
      })

    //tec

    .state('menutec.hometec', {
        url: '/hometec',
        params:{
          username:null,
          password:null
        },
        views: {
          'pageContent': {
            templateUrl: 'views/hometec.html',
            controller: 'HometecController'
          }
        }
      })

    .state('menutec', {
      url: '/menutec',
      abstract: true,
      templateUrl: 'views/menutec.html',
      controller: 'MenutecController as menutec'
    })

    .state('menutec.historytec', {
        url: '/historytec',
        views: {
          'pageContent': {
            templateUrl: 'views/historytec.html',
            controller: 'HistorytecController'
          }
        }
      })

    .state('menutec.profilestec', {
        url: '/profilestec',
        views: {
          'pageContent': {
            templateUrl: 'views/profilestec.html',
            controller: 'ProfilestecController'
          }
        }
      })

    ;
      
    $urlRouterProvider.otherwise('/master');
    })
