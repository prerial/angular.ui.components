
describe('Services test', function() {

  beforeEach(module('myApp'));

    describe('test dtAction service', function() {

        var mockBackend, loader, data={"query":{"count":5}};
        // The _$httpBackend_ is the same as $httpBackend. Only written this way to
        // differentiate between injected variables and local variables
        beforeEach(inject(function (_$httpBackend_, dataActionService) {
            mockBackend = _$httpBackend_;
            loader = dataActionService;
        }));

        it('should load pizza list and check count', function() {
            mockBackend.expectGET('/data/pizza.js').respond(data);
            var pizzalist = null;
            var promise = loader.load({method: 'GET', url: '/data/pizza.js'});
            promise.then(function(rec) {
                pizzalist = rec;
            });
            expect(pizzalist).toBe(null);
            mockBackend.flush();
            expect(pizzalist.data.query.count).toBe(5);
        });

    });

});

