'use strict';

angular.module('searchResultsFactory', [])

.factory('SearchResults', ['$location', '$http', function($location, $http) {
  //searchResults can be an array based on a query for search, a user's bookings, or a users favorites

  var searchResults = [];

  var getResults = function (params, callback, url) {
    return $http({
      method: 'GET',
      url: url,
      params: params
    })
    .then(function(response){
      console.log(response);
      searchResults.splice(0, searchResults.length);
      response.data.hits.forEach(function(val){
        searchResults.push(val);
      });
      console.log(data);
      if (callback) { callback(params); }
    });
  }

  var getFavoriteResults = function (params, callback) {
    return getResults(params, callback, 'api/favoriteResults');
  };
  
  var getBookingsResults = function (params, callback) {
    return getResults(params, callback, 'api/bookingsResults');
  };

  // this is a helper function used adjusting time format in the query timestamp; it's not exported
  var timeConverter = function (timeString) {
    var time = timeString.split(' ');
    var timeH = time[0].split(':');
    var timeM = timeH[1];
    var timeH = timeH[0];
    var ampm = time[1];
    if (ampm.indexOf('PM') > -1) {
    timeH = Number(timeH);
    timeH = timeH + 12;
    if (timeH === 24) {
      timeH = 12;      
    }
    } else if (timeH.indexOf('12') > -1) {
      timeH = '00';
    } else if (Number(timeH) < 10) {
      timeH = "0"+timeH;
    }
    return timeH+":"+timeM+':00'
  };

  var reroute = function(params) {
    $location.path('/searchbar').search(params);
  };

  var getSearchResults = function(params, callback) {
    //location only city
    //time format: YYYY-MM-DD HH:MM:SS
    var data = {};
    var startTimeStamp = "";
    var endTimeStamp = "";
    if (params.date) {
      var date = params.date.split('/');
      startTimeStamp += date[2]+ '-' + date[0] + '-' + date[1];
      endTimeStamp += date[2]+ '-' + date[0] + '-' + date[1];
    }
    
    if (params.startTime) {
      var startTime = timeConverter(params.startTime);
      startTimeStamp += ' ' + startTime;
    }

    if (params.endTime) {
      var endTime = timeConverter(params.endTime);
      endTimeStamp += ' ' + endTime;
    }

    if (startTimeStamp) {data.startTimeStamp = startTimeStamp;}
    if (endTimeStamp) {data.endTimeStamp = endTimeStamp;}
    if (params.guests) {data.guests = params.guests;}
    if (params.budget) {data.budget = params.budget;}
    if (params.eventType) {data.eventType = params.eventType;}


    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': params.location}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        data.lng = results[0].geometry.location.F;
        data.lat = results[0].geometry.location.A;

        var addressTypes = results[0].address_components;
        for (var i = 0; i < addressTypes.length; i++) {
          if (addressTypes[i].types[0] === "locality") {
            data.city = addressTypes[i].long_name;
          }
          if (addressTypes[i].types[0] === "administrative_area_level_1") {
            data.state = addressTypes[i].long_name;
          }
          if (addressTypes[i].types[0] === "country") {
            data.country = addressTypes[i].long_name;
          }
        }
        return getResults(data, callback, 'api/searchResults');
      } else {
        alert('Please enter a location!');
      }
    });
  };



  //onlyBookings is a variable to determine which bookings are shown in the Bookings tab; it is not exported
  var onlyBookings;
  var bookingsSelection = function (room) {
    if (onlyBookings && room.bookingType) {
      return (room.bookingType === onlyBookings) ? true : false;
    }
    return true;
  };
  //these functions are called in various controllers to determine the state of onlyBookings and in turn, which bookings and results are displayed
  var showAll = function () {
    onlyBookings = undefined;
  };

  var showPurchased = function () {
    onlyBookings = 'purchased';
  };

  var showPlanning = function () {
    onlyBookings = 'planning';
  };

  return {
    getFavoriteResults: getFavoriteResults,
    searchResults: searchResults,
    getSearchResults: getSearchResults,
    reroute: reroute,
    bookingsSelection: bookingsSelection,
    showPlanning: showPlanning,
    showPurchased: showPurchased,
    showAll: showAll
  };

}]);
