'use strict';


angular.module('privateTableApp')
  .controller('navController', ['$scope', '$location', 'SearchResults', 'Auth', function($scope, $location, SearchResults, Auth) {
    $scope.currentUser; 
    
    $scope.init = function () {
      $scope.currentUser = Auth.getUser();
    };

    
    //login
    $scope.loginCredentials = {};
    $scope.errors = {};
    $scope.loginShown = false;

    $scope.toggleLogin = function () {
      $scope.loginShown = !$scope.loginShown;
    };
    $scope.login = function(form) {

      if(form) {
        Auth.login({
          username: $scope.loginCredentials.username,
          password: $scope.loginCredentials.password
        })
        .then(function() {
          // Logged in, redirect to user's dashboard
          $scope.currentUser = Auth.getUser();
          $scope.toggleLogin();
          $location.path('/bookings');
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    //signup
    $scope.signupCredentials = {};
    $scope.errors = {};
    $scope.signUpShown = false;
    $scope.toggleSignUp = function () {
      $scope.signUpShown = !$scope.signUpShown;
    };

    $scope.signup = function(form) {
      if (form) {
        Auth.createUser({
          username: $scope.signupCredentials.username,
          email: $scope.signupCredentials.email,
          password: $scope.signupCredentials.password
        })
        .then(function() {
          // Account created, redirect to user's dashboard
          $scope.currentUser = Auth.getUser();
          $scope.toggleSignUp();
          $location.path('/bookings');
          
        })
        .catch(function(err) {
          err = err.data;
          $scope.errors = {};
          });
      } else {
        console.log('Form is not valid');
      }
    };

    $scope.logout = function () {
      console.log('logout called');
      Auth.logout();
      $scope.currentUser = Auth.getUser();
      console.log($scope.currentUser);
      $location.path('/');
    }
    $scope.init();
  }]);