(function() {
	var TransacoesService = function($resource) {
		return $resource("http://localhost:3000/transacao");
	}

	TransacoesService.$inject = [ "$resource" ];

	angular.module("app").service("TransacoesService", TransacoesService);
})();