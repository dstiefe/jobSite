/**
 * Created by Van on 07.03.2016.
 */
angular.module('Jobsite').controller("StartTestJobReferralController", function($scope, Login, $http, $timeout, $location, AuthService, ScreeningsService, CategoriesService, ResumesService, $state, $stateParams) {

    var jobId =   $stateParams.jobId;
    var resumeId =   $stateParams.resumeId;
    var jobReferralId =   $stateParams.jobReferralId;
    var reference_friend_id =   $stateParams.reference_friend_id;
    $scope.userName =   $stateParams.userName;

   if (reference_friend_id != null && reference_friend_id != '')
    {
        var referralObj = sessionStorage.getItem("reference_friend_ids");

        var referralsArr =[];
        if (referralObj != null)
        {
            referralsArr = JSON.parse(referralObj);
            if (referralsArr == null){
                referralsArr =[];
            }
        }
        if (referralsArr.indexOf(reference_friend_id) == -1)
        {
            referralsArr.push(reference_friend_id);
            sessionStorage.setItem("reference_friend_ids", JSON.stringify(referralsArr));

            var path = $location.path();
            sessionStorage.setItem("return_url", path);

            $state.transitionTo('login');
        }
    }
    $scope.isDisabledStart = true;
        //$scope.error_message = '';
        //$scope.resumeId = $stateParams.id;
        //$scope.screeningId = $stateParams.screeningId;
        //$scope.resume = {};
        //$scope.screening = {};
        //$scope.error_message = '';
        //$scope.isDisabledStart = false;
        //ResumesService.getResume($scope.resumeId).then(function (results) {
        //    $scope.resume  = results.data;
        //}, function (error) {
        //    console.log(error.data.message);
        //});
        //
        //ScreeningsService.getScreeningByResumeId($scope.resumeId, $scope.screeningId).then(function (results) {
        //    $scope.screening  = results.data;
        //    if ( $scope.screening.questionsCount == 0){
        //        $scope.error_message = 'Screening does not have any questions! Please try again later!';
        //        $scope.isDisabledStart = true;
        //    }
        //}, function (error) {
        //    console.log(error.data.message);
        //});

        $scope.start = function() {
            //$scope.error_message = '';
            //if ( $scope.screening.questionsCount == 0){
            //    $scope.error_message = 'Screening does not have any questions!';
            //    return;
            //}
            //
            //if ($scope.resume.screeningIds != null && $scope.resume.screeningIds.length > 0){
            //    var passedScreeningIds = [];
            //    if ($scope.resume.passedScreeningIds != null){
            //        passedScreeningIds = $scope.resume.passedScreeningIds;
            //    }
            //
            //    var diff = $scope.resume.screeningIds.diff(passedScreeningIds);
            //    if (diff.length > 0 && diff.indexOf($scope.screeningId) != -1)
            //    {
            //        $state.go('testscreening', {'id': $scope.resumeId, 'screeningId': $scope.screeningId});
            //    }else{
            //        $scope.error_message = 'You have already passed screening!';
            //    }
            //}else{
            //    $scope.error_message = 'You don not have any screenings!';
            //}
        }




});

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};
