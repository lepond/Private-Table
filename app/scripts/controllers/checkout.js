'use strict';

angular.module('privateTableApp')
  .controller('checkoutController', ['$scope', '$location', 'SearchBar', 'SearchResults', 'CheckoutOptions', '$http', 'roomData', function($scope, $location, SearchBar, SearchResults, CheckoutOptions, $http, roomData) {
    $scope.params;
    $scope.room;
    
    $scope.eventConfirmed = false;
    $scope.menuConfirmed = true;
    $scope.menuLabel = true;
    $scope.showSummary = true;

    $scope.toMenu = function() {
      CheckoutOptions.setEventParams(this.params);
      $scope.params = CheckoutOptions.getEventParams();
      $location.path('/checkout/menu');
      $scope.eventConfirmed = true;
      $scope.menuLabel = false;
      $scope.menuConfirmed = false;
    };

    $scope.toPay = function() {
      $location.path('/checkout/payments');
      $scope.menuConfirmed = true;
      $scope.showSummary = false;
    }
        //also reveal menu panel

    $scope.dateInit = function() {
      SearchBar.searchFormInit();
      $scope.params = CheckoutOptions.getEventParams();
      $scope.room = roomData.getRoom();
    };

    $scope.setMinEndTime = function () {
      var minEndTime = SearchBar.endTimeAdjuster(this.params.startTime);
      $('#eventend').datetimepicker({datepicker:false, format: 'g:i A', formatTime: 'g:i A', step: 30, minTime: minEndTime});
    };

    $scope.dateInit();

  }]);
