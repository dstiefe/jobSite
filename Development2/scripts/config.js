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
                pageTitle: 'Dashboard'
            }
        })
        .state('logout', {
            url: "/logout",
            templateUrl: "views/logout.html",
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
            url: "/jobmanagement?id",
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
            url: "/viewjobdetails?id",
            templateUrl: "views/viewjobdetails.html",
            data: {
                pageTitle: 'Job Details',
                permissions: {
                    only: ['Admin', 'User'],
                    redirectTo: 'login'
                }
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
    }

angular
    .module('Jobsite')
    .config(configState)
    .run(function($rootScope, $state, editableOptions, Permission, ValiDatedTokenObject, AuthService) {
        debugger;
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
//var checkRouting= function ($q, $rootScope, $location, ValiDatedTokenObject) {
//    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
//    if (ValiDatedTokenObject.getValiDatedTokenObject())
//    {
//        var role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
//        if(role == 'Admin') {
//            $location.path("/dashboard");
//            return $q.reject(); // Отменит старый роутинг.
//        }
//    }
//    return true;
//};