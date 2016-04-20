/**
 * Created by Van on 28.03.2016.
 */
//Controller for selecting login/register views
angular.module('Jobsite').controller('SelectLoginRegisterController', function ($scope, $modalInstance, JobsService, $state, InterviewsService, $sce, $timeout, $document, type) {

    $scope.typeText = (type=='apply')?'applying for':'referring';
    $scope.isLogin = null;


    $scope.onClose = function() {
        $modalInstance.close({
            'isLogin': $scope.isLogin
        });
    };

    $scope.selectType = function(isLogin) {
        $scope.isLogin = isLogin;
        $modalInstance.close({
            'isLogin': $scope.isLogin
        });
    };

});
