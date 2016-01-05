/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */

//var apiBasePath = 'http://ec2-52-0-227-162.compute-1.amazonaws.com:81/jobapi_dev/api/v1/';

var apiBasePath = 'http://localhost:41656/api/v1/';

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
        'permission' // Permission
    ]).constant('RESOURCES', (function() {

            // Define your variable
        var EmployeeTypes = {
            FullTime : {value: "FullTime", name: "Full Time"},
            PartTime: {value: "PartTime", name: "Part Time"},
            Casual : {value: "Casual", name: "Casual"},
            Shiftworkers : {value: "Shiftworkers", name: "Shift workers"},
            DailyAndWeeklyHire : {value: "DailyAndWeeklyHire", name: "Daily And Weekly Hire"},
            Probation : {value: "Probation", name: "Probation"},
            Outworkers : {value: "Outworkers", name: "Out workers"}
        };

            // Use the variable in your constants
            return {
                EMPLOYEE_TYPES: EmployeeTypes,
                API_BASE_PATH: apiBasePath,
                CLIENT_ID: clientId
            }
        })())
})();

