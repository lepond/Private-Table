'use strict';

angular.module('privateTableApp')
  .controller('searchResultsController', ['$scope', 'SearchResults', function( $scope, SearchResults) {
    $scope.roomResults = SearchResults.searchResults;
    $scope.bookingType = function (room) {
     return (SearchResults.bookingsSelection(room)) ?  true : false;
    };
  }]);