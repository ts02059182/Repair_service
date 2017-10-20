
var app = angular.module('starter', ['ionic', 'ngCordova','ngCordovaOauth', 'ui.router','ngAnimate'])



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
        views: {
          'pageContent': {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
          }
        }
      })

    .state('menu.hometec', {
        url: '/hometec',
        views: {
          'pageContent': {
            templateUrl: 'views/hometec.html',
            controller: 'HometecController'
          }
        }
      })    

    .state('menu.map', {
        url: '/map',
        views: {
          'pageContent': {
            templateUrl: 'views/map.html',
            controller: 'MapController'
          }
        }
      });


      
    $urlRouterProvider.otherwise('/master');
    })
