'use strict';

// Declare app level module which depends on views, and components
var app=angular.module('myApp', [
  'myApp.home',
  'myApp.search',
  'myApp.favorite',
  'myApp.setting'
  ]);
app.config(['$locationProvider',  function($locationProvider) {
     $locationProvider.html5Mode(true);
}]);

app.controller('MainCtrl', ['$http','dataService','searchService','$filter','$timeout', function($http,dataService,searchService,$filter,$timeout){
  var _timeout;
  var model = this;

  model.currentTab = 'home';
  model.searchString = '';
  model.dataService = dataService;

  model.search = function(searchString){
    model.currentTab='search';
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
  
}]);

app.factory('dataService', function($http) {
  var dataService = {
    userId:"reynald.pader@cloudsherpas.com",
    searchResult:[]
  };
  return dataService;
});