
describe('Directives test', function() {

        var $compile, $rootScope, body = $('body');

        // Load the myApp module, which contains the directive
        beforeEach(module('myApp'));

        // Store references to $rootScope and $compile
        // so they are available to all tests in this describe block
        beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_, _$http_, dataActionService){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $compile = _$compile_;
            $rootScope = _$rootScope_.$new();
         }));

        it('Replaces the element with the appropriate content', function() {
            // Compile a piece of HTML containing the directive
            var element = $compile('<dt-data-provider id="myId"></dt-data-provider>')($rootScope);
            body.append(element);
            // fire all the watches, so the scope expression will be evaluated
            $rootScope.$digest();
            var sc = angular.element($('dt-data-provider')).scope();
            // Check that the compiled element contains the scope content
            expect(sc.$parent.dataProviderId).toBe('myId');

        });
});

