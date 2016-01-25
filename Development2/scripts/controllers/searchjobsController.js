angular
    .module('Jobsite').controller("searchjobController", function($scope, Login,ValiDatedTokenObject, $location,$http, $timeout, RESOURCES, JobsService, $filter) {

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
        $scope.currentPage = 1;
        $scope.maxSize = 10;
        $scope.itemsPerPage = 10;
        $scope.totalItems = 0;
        $scope.entryLimits = [5,10,20,50,100];
        var _searchByFilter = function() {

            JobsService.searchAdvancedJobs($scope.searchtext, $scope.locationId,$scope.categoryId,$scope.employeeType,$scope.dateFrom,$scope.dateTo, ($scope.currentPage-1)*$scope.itemsPerPage,$scope.itemsPerPage).then(function (results) {
                var res = results.data;

                var categories = [];
                for (var k = 0; k < res.categoriesAggs.length; k++) {
                        categories.push({
                            category:  res.categoriesAggs[k].name,
                            id:  res.categoriesAggs[k].id,
                            count:res.categoriesAggs[k].count
                        });
                }
                var locations = [];
                for (var k = 0; k < res.locationsAggs.length; k++) {
                    locations.push({
                        location:  res.locationsAggs[k].name,
                        id:  res.locationsAggs[k].id,
                        count:res.locationsAggs[k].count
                    });
                }

                var filteredEmployeeTypes= RESOURCES.EMPLOYEE_TYPES;

                if (res.employeeTypes.length > 0){
                    filteredEmployeeTypes = RESOURCES.EMPLOYEE_TYPES.filter(function(_enum) {
                        for (var k = 0; k < res.employeeTypes.length; k++) {
                            if (_enum.value == res.employeeTypes[k] )
                                return true;
                        }
                        return false;
                    });
                }


                //if(res.dateFromAggs != null){
                //    $scope.dateFrom = $filter('date')(res.dateFromAggs*1000, "yyyy/MM/dd");
                //}
                //
                //if(res.dateToAggs != null){
                //    $scope.dateTo = $filter('date')(res.dateToAggs*1000, "yyyy/MM/dd");
                //}

                $scope.locations = locations;
                $scope.categories = categories;

                $scope.list = res.items;
                $scope.totalItems = res.count;
                $scope.EmployeeTypes = filteredEmployeeTypes;

            }, function (error) {
                console.log(error.data.message);

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
        $scope.pageChanged = function() {
            _searchByFilter();
        };
        $scope.pageSizeChanged = function() {
            _searchByFilter();
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
