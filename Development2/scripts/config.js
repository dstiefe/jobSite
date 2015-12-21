/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */

function configState($stateProvider, $urlRouterProvider, $compileProvider) {

    // Optimize load start with remove binding information inside the DOM element
    $compileProvider.debugInfoEnabled(true);

    // Set default state
    $urlRouterProvider.otherwise("/test");
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
        // Searchprojects
        .state('searchjobs', {
            url: "/searchjobs",
            templateUrl: "views/searchjobs.html",
            data: {
                pageTitle: 'Search Jobs'
            }
        })
        // Jobmanagement
        .state('jobmanagement', {
            url: "/jobmanagement",
            templateUrl: "views/jobmanagement.html",
            data: {
                pageTitle: 'Job Management'
            }
        })
        // Jobslist
        .state('jobslist', {
            url: "/jobslist",
            templateUrl: "views/jobslist.html",
            data: {
                pageTitle: 'Jobs List'
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
            url: "/viewjobdetails",
            templateUrl: "views/viewjobdetails.html",
            data: {
                pageTitle: 'Job Details'
            }
        })
         // ApplyJob
        .state('applyjob', {
            url: "/applyjob",
            templateUrl: "views/applyjob.html",
            data: {
                pageTitle: 'Apply Job'
            }
        })
    }

angular
    .module('Jobsite')
    .config(configState)
    .run(function($rootScope, $state, editableOptions) {
        $rootScope.$state = $state;
        editableOptions.theme = 'bs3';
    });
