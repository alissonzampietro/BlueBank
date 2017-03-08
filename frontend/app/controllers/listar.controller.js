(

function () {

    //não deixar criar variavel sem o var
    'use strict';

    function listarController($scope, ClienteService, TransacoesService) {
        var vm = this;
        vm.listaClientes = [];

        $scope.transferirValor = function(id_remetente, id_destinatario, valor) {
            console.log(id_remetente, id_destinatario, valor);
            if(parseInt(valor) > $scope.saldo) {
                $scope.mensagem = "Valor a ser transferido é maior que o que você possui";
                $scope.class = "erro";
            }else{
                TransacoesService.save({id_remetente: id_remetente, id_destinatario: id_destinatario, valor:valor});
                $scope.saldo = $scope.saldo - valor;
                $scope.mensagem = "Transação efetuada com sucesso";
                $scope.class = "sucesso";
            }
        }

        ClienteService.query({}, function(response) {
            var myUser = response[0];
            $scope.meu_id = myUser.id;
            $scope.nome = myUser.cliente.nome;
            $scope.saldo = myUser.saldo;
            vm.listaClientes = response;
        });
    }
    
    listarController.$inject = ['$scope', 'ClienteService', 'TransacoesService'];

    angular.module('app').controller('listarController',listarController);
}

)();