'use strict';

var app = angular.module('myApp.favorite', []).config([function() {
}]);

app.controller('FavCtrl', ['$scope','favoriteService','dataService','$filter','$sce',function($scope,favoriteService,dataService,$filter,$sce) {
  var model = this;

  model.hoverOn = function(trackId){
    model.currentHover = trackId;
  };
  model.hoverOff = function(trackId){
    model.currentHover = -1;
    var audio = document.getElementById("audio"+trackId);
    audio.pause();
  };
  model.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };
  model.loadFavorites = function(src) {
    favoriteService.loadFavorites(src).then(function(d) {
      model.favorites = d;
    });
  };

  model.deleteFavorite = function(src,index) {
    favoriteService.removeData(dataService.userId,src);

    model.favorites.splice(index, 1);

  };
  
  model.loadFavorites(dataService.userId);

}]);

app.factory('favoriteService', function($http) {
  var favoriteService = {
    loadFavorites: function(userId) {
      var promise = $http.get('https://cs-itunes.appspot.com/api/favorite/'+userId).then(function (response) {
        var favorites = [];
        for(var derp of response.data){
          var temp = angular.fromJson(derp.itunes_data);
          temp.id = derp.id;
          favorites.push(temp);
        }
        return favorites;
      });
      return promise;
    },
    addData: function(userId,param){
      $http.post('https://cs-itunes.appspot.com/api/favorite/'+userId, param );
    },
    removeData: function(userId,param){
      var promise = $http.delete('https://cs-itunes.appspot.com/api/favorite/'+userId+'/'+param ).then(function(response){
        return response;
      });
      return promise;
    }
  };
  return favoriteService;
}); 