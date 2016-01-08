(function (angular) {
    'use strict';

    function filterService($filter) {
        var filterProperties, filterQuery, _isStartsWith, $$filter;

        filterProperties = 'name';
        filterQuery = '';
        _isStartsWith = false;
        $$filter = $filter('filter');


        function isStringStartsWithQuery(stringToSearchIn, query) {
            return stringToSearchIn.indexOf(query) === 0;
        }

        function isStringContainsSearchText(stringToSearchIn, searchtext) {
            return stringToSearchIn.search(searchtext) !== -1;
        }

        function getComparator(customComparator) {
            var properties = filterProperties.split(','), objValue,
                searchText = filterQuery.toLowerCase();
            return function (value) {
                var out = _.some(properties, function (item) {
                    item = item.trim();
                    objValue = ('' + value[item]).toLowerCase();
                    return isStringContainsSearchText(objValue, searchText) && customComparator(objValue, searchText);
                });
                return out;
            };
        }

        function returnTrue() {
            return true;
        }

        /*
         comparator function to search in all data with startWith Constraint
         */
        function startsWithSearchInAll(actual, expected) {
            var stringToSearch = ('' + actual).toLowerCase();
            return isStringStartsWithQuery(stringToSearch, expected.toLowerCase());
        }


        function getFilteredData(obj) {
            var out, comparatorFunction, customComparator;
            if (filterProperties === "*") {
                if (!_isStartsWith) {
                    out = $$filter(obj.data, {$: filterQuery});
                } else {
                    out = $$filter(obj.data, filterQuery, startsWithSearchInAll);
                }
            } else {
                comparatorFunction = getComparator(_isStartsWith ? isStringStartsWithQuery : returnTrue);
                out = $$filter(obj.data, comparatorFunction);
            }
            return out;
        }

        function _filterData(obj, isStartsWith) {
            if (!angular.isObject(obj) || (obj && !obj.data)) {
                return;
            }
            filterProperties = obj.fields || filterProperties;
            filterQuery = obj.query;
            _isStartsWith = isStartsWith;
            return getFilteredData(obj);
        }

        function _findExactMatch(data, matchWith) {
            var lowerMatchWith = matchWith.toLowerCase(), result;

            result = _.find(data, function (item) {
                var isMatching = false;
                angular.forEach(item, function (value) {
                    if (value.toLowerCase() === lowerMatchWith) {
                        isMatching = true;
                    }
                });
                return isMatching === true;
            });
            return result;
        }

        return {
            filterData: _filterData,
            findExactMatch: _findExactMatch
        };
    }

    filterService.$inject = ['$filter'];
    angular.module('prerial')
        .factory('saFilterService', filterService);

})(angular);