'use strict';

angular.module('myApp.setting', [])

.config([function() {
}]).controller('SettingCtrl', ['dataService',function(dataService) {
	var model = this;
	model.userid=dataService.userId;
	

	model.updateDataService = function(id){
		dataService.userId = model.userid;
	}

}]);