(function() {
	var VisualizarController = function($scope, $stateParams, ClienteService) {
		$scope.cliente = {};

		ClienteService.get({id: $stateParams.id}, function(response) {
			$scope.cliente = response.data;
		});
	}

	VisualizarController.$inject = [ "$scope", "$stateParams", "ClienteService" ];

	angular.module("app").controller("VisualizarController", VisualizarController);
})();