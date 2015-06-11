'use strict';

angular.module('privateTableApp')
  .controller('landingController', ['$scope', '$location', 'SearchBar', 'SearchResults', function($scope, $location, SearchBar, SearchResults) {
    $scope.params = {};
    $scope.submitSearch = function() {
      //check that all forms are filled before initiating request
      SearchBar.setSearchParams(this.params, SearchResults.reroute, '/searchbar');
    };
    $scope.init = function () {
      SearchBar.searchFormInit();
    };

    $scope.setMinEndTime = function () {
      
      var minEndTime = SearchBar.endTimeAdjuster($scope.params.startTime);
      console.log('THIS IS MINEND', minEndTime);
      $('#endtimepick').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
      $('#starttimepick').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: '12:00 AM'});
    };

    $scope.init();
  }]);


      