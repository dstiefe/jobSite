/**
 * Created by Van on 09.02.2016.
 */
//Controller for setting referral
angular.module('Jobsite').controller('SetReferralController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, referralFeePercent, referralFeeAmount, jobTitle) {

    $scope.referralFeePercent = referralFeePercent;
    $scope.referralFeeAmount = referralFeeAmount;


    $scope.referralFeePercentList = [];
    for(var i=1; i<10; i++)
    {
        $scope.referralFeePercentList.push(i*5);
    }
    $scope.agreeTerm = (!angular.isUndefined(referralFeePercent) && referralFeePercent!=null) || (!angular.isUndefined(referralFeeAmount)&& referralFeeAmount != null);
    $scope.jobTitle = jobTitle;
    $scope.message ='';
    $scope.onClose = function() {
        $modalInstance.close({
            'referralFeePercent': referralFeePercent,
            'referralFeeAmount': referralFeeAmount
        });
    }

    if (!angular.isUndefined(referralFeePercent) && referralFeePercent!=null){
        $scope.feeType='percent';
    }

    if (!angular.isUndefined(referralFeeAmount) && referralFeeAmount!=null){
        $scope.feeType='fixed';
    }

    $scope.changeFeeType = function(){
        if (  $scope.feeType=='percent'){
            $scope.referralFeeAmount = null;
        }
        if (  $scope.feeType=='fixed'){
            $scope.referralFeePercent = null;
        }
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