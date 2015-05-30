'use strict';

angular.module('privateTableApp')
  .controller('favoritesController', ['$scope', 'SearchBar', 'SearchResults', function($scope, SearchBar, SearchResults) {
    $scope.init = function () {
      SearchResults.getFavoriteResults();
      SearchResults.showAll();
    }
  }]);