'use strict';

// Declare app level module which depends on views, and components
var app=angular.module('myApp', [
  'myApp.home',
  'myApp.search',
  'myApp.favorite'
  ]);
app.config(['$locationProvider',  function($locationProvider) {
}]);

app.controller('MainCtrl', ['$http','dataService','appService','favoriteService','searchService','$filter','$timeout', function($http,dataService,appService,favoriteService,searchService,$filter,$timeout){
  var _timeout;
  var model = this;
  
  model.searchString = '';
  model.appService = appService;
  model.dataService = dataService;
  model.searchService = searchService;

  model.search = function(searchString){
    model.appService.currentTab='search';
    if(_timeout){
      $timeout.cancel(_timeout);
    }
    _timeout = $timeout(function(){
     searchService.getSearchPromise(searchString).then(function(d) {
       dataService.searchResult = d.results;
     });
     _timeout = null;
   },1000);
    
  };
  model.favorites = function(){
    favoriteService.loadFavorites(dataService.userId);
  }
  
}]);

app.factory('dataService', function($http) {
  var dataService = {
    userId:"reynaldmpader@cloudsherpas.com",
    searchResult: []
  };
  return dataService;
});

app.factory('appService', function($http) {
  var appService = {
    currentTab: 'home'
  };
  return appService;
});