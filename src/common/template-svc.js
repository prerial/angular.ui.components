(function (angular, _) {
    'use strict';

    function skipCompile(template) {
        var out = false;
        if (_.templateSettings) {
            out = _.templateSettings.interpolate.test(template);
            if (!out) {
                out = _.templateSettings.evaluate.test(template);
            }
            if (!out) {
                out = _.templateSettings.escape.test(template);
            }
        }
        return out;
    }

    angular.module('prerial').factory('TemplateService', TemplateService);

    TemplateService.$inject = ['$templateCache', '$http', '$q', '$compile', '$log'];

    function TemplateService($templateCache, $http, $q, $compile, $log) {

    	var queuedRequests = {};

    	return {
            get: function (templateUrl) {
                var def = $q.defer(),
                	compiled = null;
                if (templateUrl) {
                    if (queuedRequests.hasOwnProperty(templateUrl)) {
                        return queuedRequests[templateUrl].promise;
                    }
                    var rQueue = queuedRequests[templateUrl] = def;
                    var template = $templateCache.get(templateUrl);
                    if (!template) {

                        $http.get(templateUrl, { cache: true }).then(function (resp) {

                            if (resp.data) {
                                $templateCache.put(resp.config.url, resp.data);
                                if (!skipCompile(resp.data)) {
                                    compiled = $compile(resp.data);
                                }
                                compiled.contents = resp.data;
                                queuedRequests[resp.config.url].resolve(compiled);
                            }
                        }, function (resp) {
                            queuedRequests[resp.config.url].reject();
                            $log.error('Template service failed to fetch remote url: ' + resp.config.url);
                        });
                    } else {
                        if (!skipCompile(template)) {
                            compiled = $compile(template);
                        }
                        compiled.contents = template;
                        rQueue.resolve(compiled);
                    }
                    return rQueue.promise;
                } else {
                    def.reject();
                    $log.error('Template service requires URL to work');
                    return def.promise;
                }
            }
        };
    }
})(angular, _);
