angular.module('privateTableApp')
  .controller('bookingsController', ['$scope', 'SearchResults', function( $scope, SearchResults) {
    //This controller determines how the ngRepeat in searchResults view is filtered.
    $scope.init = function () {
      this.showAll();
    };
    $scope.showAll = function () {
      SearchResults.showAll();
    };
    $scope.showPurchased = function () {
      SearchResults.showPurchased();
    };

    $scope.showPlanning = function () {
      SearchResults.showPlanning();
    };

    $scope.init();
  }]);