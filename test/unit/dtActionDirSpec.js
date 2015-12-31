
describe('Directives test', function() {
        var $compile, $rootScope, $http, loader, body = $('body'),
            mockBackend, data={"query":{"count":5}};

        // Load the myApp module, which contains the directive
        beforeEach(module('prerial'));

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$http_, dataActionService){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            mockBackend = _$httpBackend_;
            $compile = _$compile_;
            $http = _$http_;
            $rootScope = _$rootScope_.$new();
            loader = dataActionService;
            loader.load = function(param){
                $rootScope.blnScope = true;
                return $http({method: param.method, url: param.url});
            }
         }));

        it('Replaces the element with the appropriate content', function() {
             mockBackend.expectGET('/data/pizza.js').respond(data);
            // Compile a piece of HTML containing the directive
            var element = $compile('<dt-action method="GET" url="/data/pizza.js"></dt-action>')($rootScope);
            body.append(element);
            // fire all the watches, so the scope expression will be evaluated
            $rootScope.$digest();
            var sc = angular.element($('dt-action')).scope();
            // Check that the compiled element contains the scope content
            expect(sc.blnScope).toBe(true);

        });
});

