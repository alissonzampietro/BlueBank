(

function () {

    //não deixar criar variavel sem o var
    'use strict';

    function transacoesController($scope, TransacoesService) {
        var vm = this;
        vm.listaTransacoes = [];

        TransacoesService.query({}, function(response) {
            vm.listaTransacoes = response;
        });
    }
    
    transacoesController.$inject = ['$scope', 'TransacoesService'];

    angular.module('app').controller('transacoesController',transacoesController);
}

)();