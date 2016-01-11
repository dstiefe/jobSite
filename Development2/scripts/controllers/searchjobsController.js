angular
    .module('Jobsite').controller("searchjobController", function($scope, Login,ValiDatedTokenObject, $location,$http, $timeout) {

    //ValiDatedTokenObject.setValiDatedTokenObject(JSON.parse(sessionStorage.getItem("ValiDatedTokenObject")));
    //if (ValiDatedTokenObject.getValiDatedTokenObject())
    //{
    //    var role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
    //    if(role == 'Admin') $location.path("/dashboard");
        //}
        if (sessionStorage.getItem("ValiDatedTokenObject") == null) { } else {
            $scope.role = ValiDatedTokenObject.getValiDatedTokenObject().roles;
        }
        $scope.searchlocation = "";
        $scope.searchtext = "";
        var req = {
            method: 'GET',
            url: ServicesURL + 'api/v1/jobs/search',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        $http(req).then(function(data) { 
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
        $scope.searchjob = function() {
            var searchtext = "";
            if ($scope.searchtext != "") {
                searchtext += '?text=' + $scope.searchtext;
            } 
            if ($scope.searchlocation != "") {
                searchtext += (searchtext == "") ? '?location=' + $scope.searchlocation : '&location=' + $scope.searchlocation;
            } 
            var req1 = {
                method: 'GET',
                url: ServicesURL + 'api/v1/jobs/search' + searchtext + '',
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
        };
        $scope.searchbycategory = function(categoryname) {
            var req1 = {
                method: 'GET',
                url: ServicesURL + 'api/v1/jobs/search?text=' + categoryname + '',
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
        };
        $scope.searchbylocation = function(locationname) {
            var req1 = {
                method: 'GET',
                url: ServicesURL + 'api/v1/jobs/search?location=' + locationname + '',
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

    })
