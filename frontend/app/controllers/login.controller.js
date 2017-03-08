(function() {
	var LoginController = function($scope, ClienteService) {
		$scope.cadastrar = function(dados) {
			ClienteService.save({nome: $scope.aluno.nome, email: $scope.aluno.email, telefone: $scope.aluno.telefone});
			$scope.aluno.nome = "";
			$scope.aluno.email = "";
			$scope.aluno.telefone = "";
		}
	}

	LoginController.$inject = ["$scope", "ClienteService"];

	angular.module("app").controller("LoginController", LoginController);


})();