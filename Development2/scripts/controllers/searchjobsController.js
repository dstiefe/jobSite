angular
    .module('Jobsite').controller("searchjobController", function($scope, Login,ValiDatedTokenObject, $location,$http, $timeout, RESOURCES) {

        if (sessionStorage.getItem("ValiDatedTokenObject") == null) { } else {
            ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
            $scope.role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
        }

        $scope.searchtext = "";
        $scope.categoryId = '';
        $scope.locationId = '';
        $scope.employeeType = '';
        $scope.EmployeeTypes = RESOURCES.EMPLOYEE_TYPES;
        $scope.dateFrom ='';
        $scope.dateTo ='';
        //$scope.currentPage = 1;
        //$scope.maxSize = 10;
        //$scope.itemsPerPage = 10;
        //$scope.totalItems = 0;
        //$scope.maxSize = 5;

        var _searchByFilter = function() {

        var params = {};
        params['count'] = 1000;
        if ($scope.locationId != '') {
            params['locationId'] = $scope.locationId;
        }

        if ($scope.categoryId != '') {
            params['categoryId'] = $scope.categoryId;
        }

        if ($scope.searchtext != ''){
            params['text'] = $scope.searchtext;
        }

        if ($scope.employeeType != '') {
            params['employeeType'] = $scope.employeeType;
        }

        if ($scope.dateFrom != '' && $scope.dateFrom != 0) {
                params['dateFrom'] = new Date($scope.dateFrom).getTime()/1000;
        }

        if ($scope.dateTo != ''&& $scope.dateTo != 0) {
                params['dateTo'] = new Date($scope.dateTo).getTime()/1000;
         }

        var query = jQuery.param(params);
        var serviceUrl = ServicesURL + 'api/v1/jobs/search?'+query;

        var req1 = {
            method: 'GET',
            url: serviceUrl,
            headers: {
                'Content-Type': 'application/json'
            }
        }
        $http(req1).then(function(data) {
            if (data.status == "200") {
                $scope.list = data.data;
                var locations = [];
                var categories = [];
                for (var k = 0; k < data.data.length; k++) {

                    var visibleornot = true;
                    for (l = 0; l < locations.length; l++) {
                        if (locations[l].location == data.data[k].location) {
                            visibleornot = false;
                            locations[l].count = locations[l].count + 1;
                        }
                    }
                    if (visibleornot) {
                        locations.push({
                            location: data.data[k].location,
                            id: data.data[k].locationId,
                            count: 1
                        });
                    }
                }
                for (var k = 0; k < data.data.length; k++) {

                    var visibleornot = true;
                    for (l = 0; l < categories.length; l++) {
                        if (categories[l].category == data.data[k].category) {
                            visibleornot = false;
                            categories[l].count = categories[l].count + 1;
                        }
                    }
                    if (visibleornot) {
                        categories.push({
                            category: data.data[k].category,
                            id: data.data[k].categoryId,
                            count: 1
                        });
                    }
                }
                $scope.locations = locations;
                $scope.categories = categories;
                $scope.currentPage = 1; //current page
                $scope.entryLimit = 10; //max no of items to display in a page
                $scope.filteredItems = $scope.list.length; //Initially for no filter
                $scope.totalItems = $scope.list.length;
            }
        });
    }

        $scope.searchjob = function() {

            $scope.categoryId = '';
            $scope.locationId = '';
            $scope.employeeType = '';
            $scope.dateFrom ='';
            $scope.dateTo ='';

            _searchByFilter();
        };
        $scope.searchbycategory = function(categoryid) {

            if ($scope.categoryId != categoryid){
                $scope.categoryId = categoryid;
            }else{
                $scope.categoryId = '';
            }
            _searchByFilter();
        };
        $scope.searchbylocation = function(locationId) {

            if ($scope.locationId != locationId){
                $scope.locationId = locationId;
            }else{
                $scope.locationId = '';
            }
            _searchByFilter();
        };
        $scope.searchByFilter= function() {
            _searchByFilter();
        };

        $scope.setPage = function(pageNo) {
            $scope.currentPage = pageNo;
        };
        $scope.filter = function() {
            $timeout(function() {
                $scope.filteredItems = $scope.filtered.length;
            }, 10);
        };
        $scope.sort_by = function(predicate) {
            $scope.predicate = predicate;
            $scope.reverse = !$scope.reverse;
        };

        _searchByFilter();





        $scope.open0 = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status0.opened = true;

        };
        $scope.open1 = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status1.opened = true;
        };
        $scope.status0 = {
            opened: false
        };
        $scope.status1 = {
            opened: false
        };

    });
