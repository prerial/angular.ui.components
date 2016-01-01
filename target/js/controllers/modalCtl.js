
angular.module('prerial').controller('prerialCtrl', ['$scope', 'prerialModal',

	function (scope, prerialModal) {


		var modalWindow = null;
	    scope.showModal = function () {
			modalWindow = new prerialModal();
			modalWindow.show();
		};
	    scope.$on("destroy:modal", function handleDestroyEvent() {
            modalWindow = null;
	    });
}]);
if (parent.document.getElementById("dlayerDiv")) parent.document.getElementById("dlayerDiv").style.visibility = "hidden";




