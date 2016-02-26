/**
 * Created by Van on 26.02.2016.
 */
angular.module('Jobsite').controller('CreateOrEditResumeController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, resumeId) {


    $scope.onClose = function() {
        $modalInstance.close({
            'referralFeePercent': referralFeePercent,
            'referralFeeAmount': referralFeeAmount
        });
    }

    $scope.onSave = function() {
        if ((angular.isUndefined($scope.referralFeePercent) || $scope.referralFeePercent == null) && (angular.isUndefined($scope.referralFeeAmount)|| $scope.referralFeeAmount == null))
        {
            $scope.message ='You don not fill Referral Fee!';
            return;
        }
        $modalInstance.close({
            'referralFeePercent':$scope.referralFeePercent,
            'referralFeeAmount':$scope.referralFeeAmount
        });
    }
});
