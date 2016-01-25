/**
 * Created by Van on 17.01.2016.
 */
angular.module('Jobsite').factory('JobsService', ['$http', '$q', 'RESOURCES','ValiDatedTokenObject', function ($http, $q, RESOURCES, ValiDatedTokenObject) {
    ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
    var serviceBase = RESOURCES.API_BASE_PATH;

    var jobsServiceFactory = {};

    var _searchAdvancedJobs = function (text, locationId, categoryId, employeeType, dateFrom, dateTo, skip, count) {
        params={};
        if (typeof text !== 'undefined' && text !==''&& text !=null)
        {
            params['text'] = text;
        }
        if (typeof locationId !== 'undefined' && locationId !==''&& locationId !=null)
        {
            params['locationId'] = locationId;
        }
        if (typeof categoryId !== 'undefined' && categoryId !==''&& categoryId !=null)
        {
            params['categoryId'] = categoryId;
        }
        if (typeof employeeType !== 'undefined' && employeeType !==''&& employeeType !=null)
        {
            params['employeeType'] = employeeType;
        }
        if (typeof dateFrom !== 'undefined'&& dateFrom !=null && dateFrom !=='' && dateFrom != 0)
        {
            params['dateFrom'] = new Date(dateFrom).getTime()/1000;
        }
        if (typeof dateTo !== 'undefined'&& dateTo !=null && dateTo !=='' && dateTo != 0)
        {
            params['dateTo'] = new Date(dateTo).getTime()/1000;
        }
        if (typeof skip !== 'undefined'&& skip !=null)
        {
            params['skip'] = skip;
        }
        if (typeof count !== 'undefined'&& count !=null)
        {
            params['count'] = count;
        }

        return $http.get(serviceBase + 'jobs/search_andavnced',{
            headers: {
                'Content-Type': 'application/json'
            },
            params: params
        }).then(function (results) {
            return results;
        });
    }

    jobsServiceFactory.searchAdvancedJobs = _searchAdvancedJobs;

    return jobsServiceFactory;
}]);