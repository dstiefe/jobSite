/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */


var apiBasePath = 'http://ec2-52-90-116-49.compute-1.amazonaws.com:81/jobapi/api/v1/'; // prod
//var apiBasePath = 'http://ec2-52-90-116-49.compute-1.amazonaws.com:81/jobapi_dev/api/v1/'; // dev
//var apiBasePath = 'http://localhost:41656/api/v1/'; //local

var clientId ="P600Us6Y476QiK331u5yEzb22dpX_y6NS75!9I-a";
(function () {
    angular.module('Jobsite', [
        'ui.router',                // Angular flexible routing
        'ngSanitize',               // Angular-sanitize
        'ui.bootstrap',             // AngularJS native directives for Bootstrap
        'angular-flot',             // Flot chart
        'angles',                   // Chart.js
        'angular-peity',            // Peity (small) charts
        'cgNotify',                 // Angular notify
        'angles',                   // Angular ChartJS
        'ngAnimate',                // Angular animations
        'ui.map',                   // Ui Map for Google maps
        'ui.calendar',              // UI Calendar
        'summernote',               // Summernote plugin
        'ngGrid',                   // Angular ng Grid
        'ui.tree',                  // Angular ui Tree
        'bm.bsTour',                // Angular bootstrap tour
        'datatables',               // Angular datatables plugin
        'xeditable',                // Angular-xeditable
        'ui.select',                // AngularJS ui-select
        'ui.sortable',              // AngularJS ui-sortable
        'ui.footable',              // FooTable
        'angular-chartist',         // Chartist
        'ui.codemirror',             // Ui Codemirror
        'textAngular',             //Text editor
        'ui.autocomplete', //UI autocomplete
        'permission', // Permission
        'timer',
        'bcherny/formatAsCurrency',
        'angular-loading-bar'
    ]).constant('RESOURCES', (function() {

            // Define your variable
        var EmployeeTypes = [
             {value: "FullTime", name: "Full Time"},
            {value: "PartTime", name: "Part Time"},
             {value: "Contract", name: "Contract"},
             {value: "Project", name: "Project"}
        ];

        var ScreeningQuestionTypes = [
            {value: "MultipleChoice", name: "Multiple/Choice"},
            {value: "TrueFalse", name: "True/False"},
            {value: "FillIn", name: "Fill In"},
            {value: "LikertScale", name: "Likert Scale"},
        ];
            // Use the variable in your constants
            return {
                EMPLOYEE_TYPES: EmployeeTypes,
                SCREENING_QUESTION_TYPES: ScreeningQuestionTypes,
                API_BASE_PATH: apiBasePath,
                CLIENT_ID: clientId
            }
        })())
        .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
            cfpLoadingBarProvider.includeSpinner = true;
            cfpLoadingBarProvider.includeBar = false;
            cfpLoadingBarProvider.spinnerTemplate = '<div class="progress" style="position: absolute; top: 63px; left:45%; width: 200px; height: 10px; z-index: 9999999999;"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only"></span></div></div>';
    }])
})();

