(function(window, angular) {
	'use strict';

    angular.module('prerial').service('dataActionService', function($http) {

    	this.load = function(param){

			if(param.params && param.method === 'JSONP'){
				param.url = param.url + '?' + param.params + '&callback=JSON_CALLBACK';
			}
			return $http({method: param.method, url: param.url})

			.success(function(data) {
				return data;
			});
    	};
/*
      return $resource('/tweets/:id',
        {},
        {
          load: { method: 'GET' }
        });
*/
    });

})(window, window.angular);


