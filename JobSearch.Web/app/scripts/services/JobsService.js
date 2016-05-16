/**
 * Created by Van on 17.01.2016.
 */
// Service for working with jobs
angular.module('Jobsite').factory('JobsService', ['$http', '$q', 'RESOURCES', function ($http, $q, RESOURCES) {

    var serviceBase = RESOURCES.API_BASE_PATH;

    var jobsServiceFactory = {};

    var _searchAdvancedJobs = function (text, locationId, categoryId, employeeType, dateFrom, dateTo, orderByTitle, orderByLocation, orderByDate, orderDirection, skip, count) {
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
        if (typeof orderByTitle !== 'undefined'&& orderByTitle !=null)
        {
            params['orderByTitle'] = orderByTitle;
        }
        if (typeof orderByLocation !== 'undefined'&& orderByLocation !=null)
        {
            params['orderByLocation'] = orderByLocation;
        }
        if (typeof orderByDate !== 'undefined'&& orderByDate !=null)
        {
            params['orderByDate'] = orderByDate;
        }
        if (typeof orderDirection !== 'undefined'&& orderDirection !=null)
        {
            params['orderDirection'] = orderDirection;
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
            params: params
        }).then(function (results) {
            return results;
        });
    };
    var _getJob = function (id, referralId) {


        params={};
        if (typeof referralId !== 'undefined' && referralId !==''&& referralId !=null)
        {
            params['referralId'] = referralId;
        }
        return $http.get(serviceBase + 'jobs/'+id).then(function (results) {
            return results;
        });
    };
    var _putJob = function (id, job) {
        return $http.put(serviceBase + 'jobs/'+id, job ).then(function (results) {
            return results;
        });
    };
    var _postJob = function (job) {
        return $http.post(serviceBase + 'jobs',job).then(function (results) {
            return results;
        });
    };
    var _deleteJob = function (id) {
        return $http.delete(serviceBase + 'jobs/'+id).then(function (results) {
            return results;
        });
    };
    var _getMyJobs = function () {
        return $http.get(serviceBase + 'jobs/my').then(function (results) {
            return results;
        });
    };
    var _getJobsApplied = function () {
        return $http.get(serviceBase + 'jobs/all/applied').then(function (results) {
            return results;
        });
    };
    var _changeActivity = function (id, data) {
        return $http.put(serviceBase + 'jobs/'+id+'/activity',data).then(function (results) {
            return results;
        });
    };

    var _downloadReportByJobId = function (id) {



        return $http.get(serviceBase + 'jobs/'+id+'/report', { responseType: 'arraybuffer' })
            .success( function(data, status, headers) {

                var octetStreamMime = 'application/octet-stream';
                var success = false;

                // Get the headers
                headers = headers();
                console.log(headers);

                // Get the filename from the x-filename header or default to "download.bin"
                var filename = headers['x-filename'] || 'download.bin';

                // Determine the content type from the header or default to "application/octet-stream"
                var contentType = headers['content-type'] || octetStreamMime;

                try
                {
                    // Try using msSaveBlob if supported
                    console.log("Trying saveBlob method ...");
                    var blob = new Blob([data], { type: contentType });
                    if(navigator.msSaveBlob)
                        navigator.msSaveBlob(blob, filename);
                    else {
                        // Try using other saveBlob implementations, if available
                        var saveBlob = navigator.webkitSaveBlob || navigator.mozSaveBlob || navigator.saveBlob;
                        if(saveBlob === undefined) throw "Not supported";
                        saveBlob(blob, filename);
                    }
                    console.log("saveBlob succeeded");
                    success = true;
                } catch(ex)
                {
                    console.log("saveBlob method failed with the following exception:");
                    console.log(ex);
                }

                if(!success)
                {
                    // Get the blob url creator
                    var urlCreator = window.URL || window.webkitURL || window.mozURL || window.msURL;
                    if(urlCreator)
                    {
                        // Try to use a download link
                        var link = document.createElement('a');
                        if('download' in link)
                        {
                            // Try to simulate a click
                            try
                            {
                                // Prepare a blob URL
                                console.log("Trying download link method with simulated click ...");
                                var blob = new Blob([data], { type: contentType });
                                var url = urlCreator.createObjectURL(blob);
                                link.setAttribute('href', url);

                                // Set the download attribute (Supported in Chrome 14+ / Firefox 20+)
                                link.setAttribute("download", filename);

                                // Simulate clicking the download link
                                var event = document.createEvent('MouseEvents');
                                event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
                                link.dispatchEvent(event);
                                console.log("Download link method with simulated click succeeded");
                                success = true;

                            } catch(ex) {
                                console.log("Download link method with simulated click failed with the following exception:");
                                console.log(ex);
                            }
                        }

                        if(!success)
                        {
                            // Fallback to window.location method
                            try
                            {
                                // Prepare a blob URL
                                // Use application/octet-stream when using window.location to force download
                                console.log("Trying download link method with window.location ...");
                                var blob = new Blob([data], { type: octetStreamMime });
                                var url = urlCreator.createObjectURL(blob);
                                window.location = url;
                                console.log("Download link method with window.location succeeded");
                                success = true;
                            } catch(ex) {
                                console.log("Download link method with window.location failed with the following exception:");
                                console.log(ex);
                            }
                        }

                    }
                }

                if(!success)
                {
                    // Fallback to window.open method
                    console.log("No methods worked for saving the arraybuffer, using last resort window.open");
                    window.open(httpPath, '_blank', '');
                }
            })
            .error(function(data, status) {
                console.log("Request failed with status: " + status);

                // Optionally write the error out to scope
                $scope.errorDetails = "Request failed with status: " + status;
            });
    };

    // Advanced search jobs
    jobsServiceFactory.searchAdvancedJobs = _searchAdvancedJobs;
    // Get job
    jobsServiceFactory.getJob = _getJob;
    // Update job
    jobsServiceFactory.putJob = _putJob;
    // Create job
    jobsServiceFactory.postJob = _postJob;
    // Delete job
    jobsServiceFactory.deleteJob = _deleteJob;
    // Get my jobs
    jobsServiceFactory.getMyJobs = _getMyJobs;
    // Get jobs applied
    jobsServiceFactory.getJobsApplied = _getJobsApplied;
    // Change activity job
    jobsServiceFactory.changeActivity = _changeActivity;

    jobsServiceFactory.downloadReportByJobId = _downloadReportByJobId

    return jobsServiceFactory;
}]);