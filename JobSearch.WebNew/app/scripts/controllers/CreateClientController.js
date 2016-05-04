/**
 * Created by Van on 06.04.2016.
 */

//Controller for creating client
angular.module('Jobsite').controller("CreateClientController", function($scope,  $http, $timeout, $location, ClientsService,  $state, $stateParams) {
    $scope.id = $stateParams.id;
    $scope.client = {};

    if (!angular.isUndefined($scope.id) && $scope.id != '') {

        ClientsService.getClient($scope.id).then(function (results) {

            $scope.client = results.data;
            $scope.client.phone = parseInt(results.data.phone);
            $scope.client.zipCode = parseInt(results.data.zipCode);
        }, function (error) {
            console.log(error.data.message);
        });

    }

    $scope.saveChanges = function(isValid) {
        console.log('isValid='+isValid);
        if (!isValid){
            return;
        }

        if (!angular.isUndefined($scope.id) && $scope.id != '') {
            ClientsService.putClient($scope.id, $scope.client).then(function (results) {
                $state.go('clients');
            }, function (error) {
                console.log(error.data.message);
            });
        }
        else{
            ClientsService.postClient($scope.client).then(function (results) {
                $state.go('clients');
            }, function (error) {
                console.log(error.data.message);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('clients');
    };
});