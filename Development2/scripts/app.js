/**
 * HOMER - Responsive Admin Theme
 * version 1.8
 *
 */


//var apiBasePath = 'http://ec2-52-90-116-49.compute-1.amazonaws.com:81/legalapi_dev/api/v1/'; // legal dev

//var apiBasePath = 'http://ec2-52-90-116-49.compute-1.amazonaws.com:81/jobapi/api/v1/'; // prod
//var apiBasePath = 'http://ec2-52-90-116-49.compute-1.amazonaws.com:81/jobapi_dev/api/v1/'; // dev
var apiBasePath = 'http://localhost:41656/api/v1/'; //local

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
        'angular-loading-bar',
        'angularSpectrumColorpicker',
        'luegg.directives'
    ]).constant('RESOURCES', (function() {

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

            var WorkingRelationshipTypes = [
                {value: "Colleague", name: "Colleague"},
                {value: "DirectSupervisor", name: "Direct Supervisor"},
                {value: "SrExecutive", name: "Sr. Executive"},
                {value: "YourDirectReport", name: "Your Direct Report"},
                {value: "CharacterReference ", name: "Character Reference"}
            ];

            // constants
            return {
                EMPLOYEE_TYPES: EmployeeTypes,
                SCREENING_QUESTION_TYPES: ScreeningQuestionTypes,
                WORKING_RELATIONSHIP_TYPES: WorkingRelationshipTypes,
                API_BASE_PATH: apiBasePath,
                CLIENT_ID: clientId,
                TRAITIFY_PUBLIC_KEY: 'm8rrmi54uig26dapmnv6bstak9',
                TRAITIFY_HOST: 'api-sandbox.traitify.com',
                TRAITIFY_VERSION: 'v1'
            }

        })())

        .config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
            //loading bar config
            cfpLoadingBarProvider.includeSpinner = true;
            cfpLoadingBarProvider.includeBar = false;
            cfpLoadingBarProvider.spinnerTemplate = '<div id="outer" style="width:100%;position: absolute; top: 63px; "><div class="progress" style=" margin: 0 auto;  width: 200px; height: 10px; z-index: 9999999999;"><div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"><span class="sr-only"></span></div></div></div>';

        }])
        .config(['$provide', function($provide){
            // text-editor config
            $provide.decorator('taOptions', ['taRegisterTool','$delegate', function(taRegisterTool, taOptions){
                taOptions.toolbar = [
                    [],
                    ['bold', 'italics', 'underline', 'ul', 'ol',],
                    ['justifyCenter'],
                    [ 'insertImage', 'insertLink', 'insertVideo'],
                    ['fontColor']
                ];

                taRegisterTool('fontColor', {
                    display: "<div spectrum-colorpicker ng-model='color' on-change='!!color && action(color)' format='\"hex\"' options='options'></div>",
                    action: function (color) {
                        var me = this;
                        if (!this.$editor().wrapSelection) {
                            setTimeout(function () {
                                me.action(color);
                            }, 100)
                        } else {
                            return this.$editor().wrapSelection('foreColor', color);
                        }
                    },
                    iconclass: "fa fa-font",
                    options: {
                        replacerClassName: 'fa fa-font', showButtons: true
                    },
                    color: "#000"
                });
                return taOptions; // whatever you return will be the taOptions
            }]);
        }])

})();

