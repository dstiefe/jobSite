angular
    .module('Jobsite').controller("ViewJobDetailsController", function ($scope, Login, ValiDatedTokenObject, $location,$stateParams, $modal, $http, $location, $sce, JobsService, AuthService) {
        $scope.loading = false;
        var jobId =   $stateParams.id;
        var referralId =   $stateParams.referral;
        var type =   $stateParams.type;

        if (!AuthService.authentication.isAuth)
        {
            var referralObj = sessionStorage.getItem("referrals");

            var referralsArr =[];
            if (referralObj != null)
            {
                referralsArr = JSON.parse(referralObj);
                if (referralsArr == null){
                    referralsArr =[];
                }
            }
            if (referralsArr.indexOf(referralId) == -1)
            {
                referralsArr.push(referralId);


                sessionStorage.setItem("referrals", JSON.stringify(referralsArr));
            }
        }

        JobsService.getJob(jobId, referralId).then(function (data) {
            $scope.loading = true;
            $scope.jobTitle =  $sce.trustAsHtml(data.data.title);
            $scope.jobLocation = data.data.location;
            $scope.jobDescription = $sce.trustAsHtml( data.data.description);
            $scope.jobRequirements =  $sce.trustAsHtml(data.data.requirements);
            $scope.employeeType = data.data.employeeType;
            $scope.location = data.data.location;
            $scope.jobtype = data.data.type;
            $scope.experience = data.data.experience;
            $scope.posteddate = data.data.publishedDate;
            $scope.jobAboutus = $sce.trustAsHtml( data.data.aboutUs);
            $scope.applicants = data.data.applicants;
            $scope.isOwn = data.data.isOwn;
            $scope.isApplied = data.data.isApplied;
            $scope.isReferral = data.data.referralFeePercent >0 || data.data.referralFeeAmount > 0;

        }, function (error) {
            console.log(error.data.message);
        });

        $scope.onApply = function() {
            if (AuthService.authentication.isAuth && AuthService.authentication.isUser)
            {
                $modal.open({
                    templateUrl: 'views/applyjob.html',
                    controller: ApplyJobController,
                    scope: $scope
                });
            } else{


                $location.search('type', 'apply');
                sessionStorage.setItem("return_url",  $location.path());
                $location.path("/login");
            }
        };

        $scope.showReferralView = function() {
            if (AuthService.authentication.isAuth && AuthService.authentication.isUser)
            {
            $modal.open({
                animation: true,
                templateUrl: 'views/SendReferral.html',
                controller: 'SendReferralController',
                size : 'lg',
                resolve: {
                    jobId: function () {
                        return jobId;
                    },
                    jobTitle: function () {
                        return $scope.jobTitle;
                    }
                }});
            } else{

                $location.search('type', 'referral');
                sessionStorage.setItem("return_url", $location.path());
                $location.path("/login");
            }
        };

        if (!angular.isUndefinedOrNull(type) && type !='')
        {
            if (type=='referral'){
                $scope.showReferralView();
            }
            if (type=='apply'){
                $scope.onApply();
            }
        }

    });
