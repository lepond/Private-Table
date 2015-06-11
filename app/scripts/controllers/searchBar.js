'use strict';

angular.module('privateTableApp')
  .controller('searchBarController', ['$scope', '$location', 'SearchBar', 'SearchResults', '$stateParams', function($scope, $location, SearchBar, SearchResults, $stateParams) {
   
    $scope.params;

    $scope.newSearch = function() {
      SearchBar.setSearchParams(this.params);
    };

    $scope.init = function () {
      SearchBar.searchFormInit();
      if ($stateParams) {
        SearchResults.getResults($stateParams, 'api/searchresults');
      }
      $scope.params = SearchBar.getSearchParams();
      SearchResults.showAll();
    };

    $scope.setMinEndTime = function () {
      
      var minEndTime = SearchBar.endTimeAdjuster($scope.params.startTime);
      console.log('THIS IS MINEND', minEndTime);
      $('#endtimepicker').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
      // $('#starttimepicker').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30});
    };
    
    $scope.init();
  }]);