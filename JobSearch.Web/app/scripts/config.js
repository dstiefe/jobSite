function configState($stateProvider, $urlRouterProvider, $compileProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    //$urlRouterProvider.otherwise('/searchjobs');

    // Set default state
    $urlRouterProvider.otherwise( function($injector) {
        var $state = $injector.get("$state");
        $state.go('searchjobs');
    });

    $stateProvider

        // Dashboard - Main page
        .state('dashboard', {
            url: "/dashboard?jobId&resumeId&messageshow",
            templateUrl: "views/dashboard.html",
            data: {
                pageTitle: 'Dashboard',
                params: {
                    jobId: { squash: true},
                    resumeId: { squash: true},
                    messageshow: { squash: true},
                }
            }
        })

        .state('logout', {
            url: "/logout",
            controller: function($state, $rootScope, AuthService) {
                AuthService.logOut();
                $state.go('login');
            },
            data: {
                pageTitle: 'logout'
                /*permissions: {
                 only: ['Admin', 'User'],
                 redirectTo: 'login'
                 }*/
            }
        })

        // Searchprojects
        .state('searchjobs', {
            url: "/searchjobs",
            templateUrl: "views/searchjobs.html",
            data: {
                pageTitle: 'Search Jobs',
                permissions: {
                    except: ['Admin'],
                    redirectTo: 'dashboard'
                }
            }
            //,
            //resolve: {
            //    factory: checkRouting
            //}
        })

        // Jobmanagement
        .state('jobmanagement', {
            url: "/jobmanagement/:id",
            templateUrl: "views/jobmanagement.html",
            data: {
                pageTitle: 'Job Management',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        // Jobslist
        .state('jobslist', {
            url: "/jobslist",
            templateUrl: "views/jobslist.html",
            data: {
                pageTitle: 'Jobs List',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        // Login
        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            data: {
                pageTitle: 'Login'
            }
        })

        .state('associate', {
            url: "/associate",
            templateUrl: "views/associate.html",
            data: {
                pageTitle: 'Associate'
            }
        })

        // Register
        .state('register', {
            url: "/register",
            templateUrl: "views/login.html",
            data: {
                pageTitle: 'Register'
            }
        })

        // Register
        .state('viewjobdetails', {
            url: "/viewjobdetails?id&referral&type",
            templateUrl: "views/viewjobdetails.html",
            data: {
                pageTitle: 'Job Details'
            },
            params: {
                id: {squash: true},
                referral: { squash: true},
                type: { squash: true}
            }
            //, resolve: {
            //    factory: checkRouting
            //}
        })

        // ApplyJob
        .state('applyjob', {
            url: "/applyjob",
            templateUrl: "views/applyjob.html",
            data: {
                pageTitle: 'Apply Job',
                permissions: {
                    only: ['User'],
                    redirectTo: 'login'
                }
            }
        })

        .state('applicants', {
            url: "/applicants/:id?resumeId&messageshow",
            templateUrl: "views/applicants.html",
            data: {
                pageTitle: 'Applicants',
                params: {
                    resumeId: { squash: true},
                    messageshow: { squash: true},
                }
            }
        })

        //Search resumes home
        .state('searchresumeshome', {
            url: "/searchresumeshome",
            templateUrl: "views/SearchResumesHome.html",
            data: {
                pageTitle: 'Search Resumes Home',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        //Search resumes
        .state('searchresumes', {
            url: "/searchresumes",
            templateUrl: "views/SearchResumes.html",
            data: {
                pageTitle: 'Search Resumes',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('resetpassword', {
            url: "/resetpassword",
            templateUrl: "views/resetpassword.html",
            data: {
                pageTitle: 'Reset password'
            }
        })

        .state('resetpasswordverify', {
            url: "/resetpasswordverify",
            templateUrl: "views/resetpasswordverify.html",
            data: {
                pageTitle: 'Change password'
            }
        })

        .state('screenings', {
            url: "/screenings",
            templateUrl: "views/Screenings.html",
            data: {
                pageTitle: 'Screenings',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('createscreening', {
            url: "/screenings/create",
            templateUrl: "views/CreateScreening.html",
            data: {
                pageTitle: 'Create Screening',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('editscreening', {
            url: "/screenings/:id/edit",
            templateUrl: "views/EditScreening.html",
            data: {
                pageTitle: 'Edit Screening',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('editscreeninginfo', {
            url: "/screenings/:id/info/edit",
            templateUrl: "views/CreateScreening.html",
            data: {
                pageTitle: 'Edit Screening Info',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('createscreeningquestion', {
            url: "/screenings/:id/questions/create",
            templateUrl: "views/CreateScreeningQuestion.html",
            params: {
                'type': 'createscreening',
            },
            data: {
                pageTitle: 'Create Screening Question',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('editscreeningquestion', {
            url: "/screenings/:id/questions/:questionId/edit",
            templateUrl: "views/CreateScreeningQuestion.html",
            params: {
                'type': 'createscreening',
            },
            data: {
                pageTitle: 'Edit Screening Question',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('starttestscreening', {
            url: "/jobs/:jobId/resumes/:id/screenings/:screeningId/start",
            templateUrl: "views/StartTestScreening.html",
            data: {
                pageTitle: 'Start screening tests',
                //permissions: {
                //    only: ['User'],
                //}
            }
        })

        .state('testscreening', {
            url: "/jobs/:jobId/resumes/:id/screenings/:screeningId/test",
            templateUrl: "views/TestScreening.html",
            data: {
                pageTitle: 'Screening test',
                permissions: {
                    only: ['User'],
                    redirectTo: 'login'
                }
            }
        })

        .state('finishtestscreening', {
            url: "/resumes/screenings/finish",
            templateUrl: "views/FinishTestScreening.html",
            data: {
                pageTitle: 'Finish screening tests',
                permissions: {
                    only: ['User'],
                    redirectTo: 'login'
                }
            }
        })

        .state('resumes', {
            url: "/resumes",
            templateUrl: "views/Resumes.html",
            data: {
                pageTitle: 'Resumes',
                permissions: {
                    only: ['User'],
                    redirectTo:'login'
                }
            }
        })

        .state('referrals', {
            url: "/references",
            templateUrl: "views/Referrals.html",
            data: {
                pageTitle: 'References',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('createreferral', {
            url: "/references/create",
            templateUrl: "views/CreateReferral.html",
            data: {
                pageTitle: 'Create Reference',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('editreferral', {
            url: "/references/:id/edit",
            templateUrl: "views/EditReferral.html",
            data: {
                pageTitle: 'Edit Reference',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('editreferralinfo', {
            url: "/references/:id/info/edit",
            templateUrl: "views/CreateReferral.html",
            data: {
                pageTitle: 'Edit Reference Info',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('createreferralquestion', {
            url: "/references/:id/questions/create",
            templateUrl: "views/CreateReferralQuestion.html",
            params: {
                'type': 'createreferral',
            },
            data: {
                pageTitle: 'Create Reference Question',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('editreferralquestion', {
            url: "/references/:id/questions/:questionId/edit",
            templateUrl: "views/CreateReferralQuestion.html",
            params: {
                'type': 'createreferral',
            },
            data: {
                pageTitle: 'Edit Reference Question',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('download_resume', {
            url: "/download_resume/:id",
            templateUrl: "views/DownloadResume.html",
            data: {
                pageTitle: 'Download resume',
                permissions: {
                    only: ['Admin', 'User'],
                    redirectTo: 'login'
                }
            }
        })

        .state('assignscreening', {
            url: "/screenings/:id/assign",
            templateUrl: "views/ScreeningAssign.html",
            data: {
                pageTitle: 'Screening Assign',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('assignreferral', {
            url: "/references/:id/assign",
            templateUrl: "views/ReferralAssign.html",
            data: {
                pageTitle: 'Reference Assign',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('starttestjobreferral', {
            url: "/jobs/:jobId/resumes/:resumeId/references/:jobReferralId/start?reference_friend_id",
            templateUrl: "views/StartTestJobReferral.html",
            params: {
                reference_friend_id: { squash: true},
                userName: ''
            },
            data: {
                pageTitle: 'Start references tests',
                //permissions: {
                //    only: ['User'],
                //}
            }
        })

        .state('testsjobreferral', {
            url: "/jobs/:jobId/resumes/:resumeId/references/:jobReferralId/test",
            templateUrl: "views/TestJobReferral.html",
            data: {
                pageTitle: 'Reference test',
                permissions: {
                    only: ['User'],
                    redirectTo: 'login'
                }
            }
        })

        .state('finishestsjobreferral', {
            url: "/jobs/:jobId/resumes/:resumeId/references/:jobReferralId/test/finish",
            templateUrl: "views/FinishTestJobReferral.html",
            data: {
                pageTitle: 'Finish test reference',
                permissions: {
                    only: ['User'],
                    redirectTo: 'login'
                }
            }
        })

        .state('traitify', {
            url: "/jobs/:jobId/resumes/:resumeId/traitify/:traitifyId/test",
            templateUrl: "views/Traitify.html",
            data: {
                pageTitle: 'Traitify test',
                permissions: {
                    only: ['User'],
                    redirectTo: 'login'
                }
            }
        })

        .state('traitifystart', {
            url: "/jobs/:jobId/resumes/:resumeId/traitify/:traitifyId/start",
            templateUrl: "views/TraitifyStart.html",
            data: {
                pageTitle: 'Traitify start test',
                //permissions: {
                //    only: ['User'],
                //}
            }
        })

        .state('traitifyfinish', {
            url: "/jobs/:jobId/resumes/:resumeId/traitify/:traitifyId/finish",
            templateUrl: "views/TraitifyFinish.html",
            data: {
                pageTitle: 'Traitify finish test',
                permissions: {
                    only: ['User'],
                    redirectTo: 'login'
                }
            }
        })

        .state('interviews', {
            url: "/interviews",
            templateUrl: "views/Interviews.html",
            data: {
                pageTitle: 'Interviews',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('createinterview', {
            url: "/interviews/create",
            templateUrl: "views/CreateInterview.html",
            data: {
                pageTitle: 'Create Interview',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('editinterview', {
            url: "/interviews/:id/edit",
            templateUrl: "views/EditInterview.html",
            data: {
                pageTitle: 'Edit Interview',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('editinterviewinfo', {
            url: "/interviews/:id/info/edit",
            templateUrl: "views/CreateInterview.html",
            data: {
                pageTitle: 'Edit Interview Info',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('createinterviewquestion', {
            url: "/interviews/:id/questions/create",
            templateUrl: "views/CreateInterviewQuestion.html",
            params: {
                'type': 'createinterview',
            },
            data: {
                pageTitle: 'Create Interview Question',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('editinterviewquestion', {
            url: "/interviews/:id/questions/:questionId/edit",
            templateUrl: "views/CreateInterviewQuestion.html",
            params: {
                'type': 'createinterview',
            },
            data: {
                pageTitle: 'Edit Interview Question',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('assigninterview', {
            url: "/interviews/:id/assign",
            templateUrl: "views/InterviewAssign.html",
            data: {
                pageTitle: 'Interview Assign',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('testinterview', {
            url: "/jobs/:jobId/resumes/:resumeId/interviews/:interviewId/test",
            templateUrl: "views/TestInterview.html",
            data: {
                pageTitle: 'Interview test',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        // Clients
        .state('clients', {
            url: "/clients",
            templateUrl: "views/Clients.html",
            data: {
                pageTitle: 'Clients',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        // Create Client
        .state('createclient', {
            url: "/clients/create",
            templateUrl: "views/CreateClient.html",
            data: {
                pageTitle: 'Create Client',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        // Edit Client
        .state('editclient', {
            url: "/clients/:id/edit",
            templateUrl: "views/CreateClient.html",
            data: {
                pageTitle: 'Edit Client',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })

        .state('bulkemails', {
            url: "/messages/bulk",
            templateUrl: "views/MessagesBulk.html",
            data: {
                pageTitle: 'Bulk Message',
                permissions: {
                    only: ['Admin'],
                    redirectTo: 'login'
                }
            }
        })
}

angular.module('Jobsite')
    .config(configState)
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptorService');
    })
    .run(function($rootScope, $location, $state, editableOptions, Permission, AuthService) {

        $rootScope.numberWithCommas = function (x) {
            var parts = x.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return parts.join(".");
        };

        AuthService.fillAuthData();

        $rootScope.$state = $state;
        editableOptions.theme = 'bs3';

        // Define anonymous role
        Permission.defineRole('anonymous', function (stateParams) {
                return !AuthService.authentication.isAuth;
            })
            .defineRole('User', function (stateParams) {
                return AuthService.authentication.isAuth && AuthService.authentication.isUser;
            })
            .defineRole('Admin', function (stateParams) {
                return AuthService.authentication.isAuth && AuthService.authentication.isAdministrator;
            });

        var history = [];
        $rootScope.$on('$locationChangeSuccess', function() {
            history.push($location.$$path);
            if (history.length > 5) history = history.slice(history.length - 5, 5);
        });

        $rootScope.back = function () {
            var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
            $rootScope.$apply(function() {
                $location.path(prevUrl);
                //  history = []; //Delete history array after going back
            });
        };

    });

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
};