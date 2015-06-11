'use strict';
$(document).foundation();
(function() {
    Stripe.setPublishableKey('pk_test_rT3gR317GZZ9QOG0D5uMaQWy');
})();
/**
 * @ngdoc overview
 * @name privateTableApp
 * @description
 * # privateTableApp
 *
 * Main module of the application.
 */
angular
  .module('privateTableApp', [
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ngTouch',
    'searchBarFactory',
    'searchResultsFactory',
    'roomFactory',
    'checkoutFactory',
    'angularPayments',
    'mm.foundation',
    'ngModal',
    'authFactory',
    'favoriteFactory',
    'authInterceptorFactory'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push('authInterceptor');

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'views/landing.html'
      })
      .state('searchBar', {
        url: '/searchbar?startTimeStamp&endTimeStamp&lng&lat&city&state&country&guests&budget',
        views: {
          '': {templateUrl: 'views/searchBar.html'},
          'searchResults@searchBar': {
            templateUrl: 'views/searchBar/searchResults.html',
            controller: 'searchResultsController'
          }
        }
      })
      .state('bookings', {
        url: '/bookings',
        views: {
          '': {templateUrl: 'views/bookings.html'},
          'searchResults@bookings': {
            templateUrl: 'views/searchBar/searchResults.html',
            controller: 'searchResultsController',
            authenticate: true
          }
        },
        authenticate: true
      })

      .state('favorites', {
        url: '/favorites',
        templateUrl: 'views/favorites.html',
        controller: 'favoritesController',
        authenticate: true
      })
      
      .state('checkout', {
        url: '/checkout',
        abstract: true,
        views: {
          '': {
            templateUrl: 'views/checkout.html'
          },
          'checkoutbox@checkout': {
            templateUrl: 'views/checkout/checkoutbox.html'
          }
        }
      })
      .state('checkout.room', {
        url: '/room/:roomID',
        templateUrl: 'views/checkout/room.html'
      })

      .state('checkout.menu', {
        url: '/menu',
        templateUrl: 'views/checkout/menu.html'
      })

      .state('checkout.payment', {
        url: '/payments',
        templateUrl: 'views/checkout/payments.html'
      })
      .state('checkout.confirmation', {
        url: '/confirmation',
        templateUrl: 'views/checkout/confirmation.html'
      });

    })
    .run(function ($rootScope, $location, Auth) {
     // Redirect to login if route requires auth and you're not logged in
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        Auth.isLoggedInAsync(function(loggedIn) {
          if (toState.authenticate && !loggedIn) {
            $rootScope.returnToState = toState.url;
            $location.path('/');
          }
        });
      });
      // $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
      // });
    });
      // $locationProvider.html5Mode(true).hashPrefix('!');
