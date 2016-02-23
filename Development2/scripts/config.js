/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */

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
        .state('test', {
            url: "/test",
            templateUrl: "views/Test.html",
            data: {
                pageTitle: 'Test'
            }
        })

        // Dashboard - Main page
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: {
                pageTitle: 'Dashboard',
                permissions: {
                 only: ['Admin', 'User'],
                 redirectTo: 'login'
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
                 //   redirectTo: 'login'
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
                 //   redirectTo: 'login'
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
            templateUrl: "views/Register.html",
            data: {
                pageTitle: 'Register'
            }
        })
         // Register
        .state('viewjobdetails', {
            url: "/viewjobdetails?id&referral",
            templateUrl: "views/viewjobdetails.html",
            data: {
                pageTitle: 'Job Details'
            },
            params: {
                id: {squash: true},
                referral: { squash: true}
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
                  //  redirectTo: 'login'
                }
            }
        })
        .state('applicants', {
            url: "/applicants/:id",
            templateUrl: "views/applicants.html",
            data: {
                pageTitle: 'Applicants',
                permissions: {
                    only: ['Admin'],
                    //  redirectTo: 'login'
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
                }
            }
        })
        .state('editscreening', {
            url: "/screenings/:id/edit",
            templateUrl: "views/CreateScreening.html",
            data: {
                pageTitle: 'Edit Screening',
                permissions: {
                    only: ['Admin'],
                }
            }
        })
        .state('createscreeningquestion', {
            url: "/screenings/:id/questions/create",
            templateUrl: "views/CreateScreeningQuestion.html",
            data: {
                pageTitle: 'Create Screening Question',
                permissions: {
                    only: ['Admin'],
                }
            }
        })

        .state('starttestscreening', {
            url: "/resumes/:id/screenings/start",
            templateUrl: "views/StartTestScreening.html",
            data: {
                pageTitle: 'Start screening tests',
                permissions: {
                    only: ['User'],
                }
            }
        })
        .state('testscreening', {
            url: "/resumes/:id/screenings/:screeningId/test",
            templateUrl: "views/TestScreening.html",
            data: {
                pageTitle: 'Screening test',
                permissions: {
                    only: ['User'],
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
                }
            }
        })
        .state('referrals', {
            url: "/referrals",
            templateUrl: "views/Referrals.html",
            data: {
                pageTitle: 'Referrals',
                permissions: {
                    only: ['Admin'],
                }
            }
        })
}

angular
    .module('Jobsite')
    .config(configState)
    .run(function($rootScope, $state, editableOptions, Permission, ValiDatedTokenObject, AuthService) {

        AuthService.fillAuthData();

        $rootScope.$state = $state;
        editableOptions.theme = 'bs3';

        // Define anonymous role
        Permission.defineRole('anonymous', function (stateParams) {
            if (!sessionStorage.getItem("ValiDatedTokenObject"))
            {
                return true;
            }

            ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
            if (!ValiDatedTokenObject.getValiDatedTokenObject())
            {
                return true;
            }
            return false;
        })
         .defineRole('User', function (stateParams) {
             if (!sessionStorage.getItem("ValiDatedTokenObject"))
             {
                 return false;
             }

            ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
            if (ValiDatedTokenObject.getValiDatedTokenObject())
            {
                var role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
                if(role == 'User') {
                    return true;
                }
            }
             return false;
            })
         .defineRole('Admin', function (stateParams) {
                if (!sessionStorage.getItem("ValiDatedTokenObject"))
                {
                    return false;
                }
                ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
                if (ValiDatedTokenObject.getValiDatedTokenObject())
                {
                    var role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
                    if(role == 'Admin') {
                        return true;
                    }
                }
                return false;
            });

    });

angular.isUndefinedOrNull = function(val) {
    return angular.isUndefined(val) || val === null
}