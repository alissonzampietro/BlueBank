(
	function(){

		//não deixar criar variável sem o var
		'use strict';

		//Ao invés de iniciar a function diretamente dentro da config, criamos uma função chamada config
		angular.module('app').config(config);

		config.$inject = ['$stateProvider','$urlRouterProvider'];

		function config($stateProvider,$urlRouterProvider){
			//setamos a rota padrão
			$urlRouterProvider.otherwise('/listar');
			$stateProvider.
				state('layout', {
					templateUrl: 'app/views/layout.html',
					abstract:true
				}).
				state('layout.cadastrar', {
					templateUrl: 'app/views/cadastrar.html',
					url: '/cadastrar',
					cache:false,
					activetab: 'cadastrar'
				}).
				state('layout.transacoes', {
					templateUrl: 'app/views/transacoes.html',
					url: '/transacoes',
					cache:false,
					activetab: 'transacoes'
				}).
				state('layout.listar', {
					templateUrl: 'app/views/listar.html',
					url: '/listar',
					cache:false,
					activetab: 'listar'
				}).
				state('layout.visualizar', {
					templateUrl: 'app/views/visualizar.html',
					url: '/visualizar/:id',
					cache:false
				});
		}
	}
)();