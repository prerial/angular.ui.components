
describe('Controllers test', function() {
  //you need to indicate your module in a test
  beforeEach(module('myApp'));

  describe('dtDataProviderController controller test', function() {
      var compile, scope, ctrl, body = $('body');
      // differentiate between injected variables and local variables
      beforeEach(inject(function(_$rootScope_, _$controller_, _$compile_) {
        compile = _$compile_;
        scope = _$rootScope_.$new();
        ctrl = _$controller_('dtDataProviderController', {
          $scope: scope
        });
      }));

      it('should set data to be consumed', function() {
          // Compile a piece of HTML containing the directive
          var element = compile('<dt-data-provider id="myId"></dt-data-provider>')(scope);
          body.append(element);
          // fire all the watches, so the scope expression will be evaluated
          scope.$digest();
          // Check that the compiled element contains the scope content
          ctrl.setData({data:{output:{id:1}}});
          expect(scope.$parent.myId.id).toBe(1);
      })
  });
});

