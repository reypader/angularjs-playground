'use strict';

var app = angular.module('myApp.search', [])

.config([ function() {
}]);

app.controller('SearchCtrl', ['dataService','favoriteService','$sce',function(dataService,favoriteService,$sce) {
  var model = this;
  model.dataService = dataService;

  model.hoverOn = function(trackId){
    model.currentHover = trackId;
  };
  model.hoverOff = function(trackId){
    model.currentHover = -1;
    var vid = document.getElementById("audio"+trackId);
    vid.pause();
  };
  model.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
  model.addFavorite = function(trackId){
    favoriteService.addData(dataService.userId,trackId);
  };

}]);

app.factory('searchService', ['$http', function($http){
  return { 
    getSearchPromise: function(searchString) {
      var promise = $http.get('https://itunes.apple.com/search?term='+encodeURIComponent(searchString)).then(function (response) {
        return response.data;
      });
      return promise;
    }
  };
}])