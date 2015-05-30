'use strict';

angular.module('privateTableApp')
  .controller('searchBarController', ['$scope', 'SearchBar', 'SearchResults', function($scope, SearchBar, SearchResults) {
    $scope.params;

    $scope.newSearch = function() {
      SearchBar.setSearchParams(this.params);
    };

    $scope.init = function () {
      SearchBar.searchFormInit();
      $scope.params = SearchBar.getSearchParams();
      SearchResults.showAll();
    };

    $scope.setMinEndTime = function () {
      var minEndTime = SearchBar.endTimeAdjuster(this.params.startTime);
      $('#endtime').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
    };
    
    $scope.init();
  }]);