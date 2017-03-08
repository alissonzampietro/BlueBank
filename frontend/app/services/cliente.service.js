(function() {
	var ClienteService = function($resource) {
		return $resource("http://localhost:3000/conta/:id", {responsavelId: "@id"});
	}

	ClienteService.$inject = [ "$resource" ];

	angular.module("app").service("ClienteService", ClienteService);
})();