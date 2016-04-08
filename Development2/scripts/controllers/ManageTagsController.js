/**
 * Created by Van on 08.04.2016.
 */
/**
 * Created by Van on 23.02.2016.
 */
angular.module('Jobsite').controller('ManageTagsController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, screening,$filter) {

    $scope.screening = screening;

    $scope.tags = $scope.screening.tags;

    if (!$scope.tags){
        $scope.tags = [];
    }
    $scope.types = [
        {value: true, name: "Category"},
        {value: false, name: "Value"}
    ];
    $scope.type = '';
    $scope.levels = [1,2,3];
    $scope.level = '';

    $scope.name = '';
    $scope.parent='';
    $scope.parents = {};

    $scope.levelTags = [];

    $scope.onClose = function() {
        $modalInstance.close();
    };

    $scope.addTag = function(isValid) {
        console.log('add tag');
        if (!isValid){
            return;
        }

        if (!$scope.parent || $scope.parent == ''){
            $scope.level = 0;
        }

        $scope.tags.push({
               name: $scope.name,
               parentName: $scope.parent,
               level: parseInt($scope.level)+1,
               type: $scope.type,
               tags:[]
           });
        $scope.type = '';
        $scope.name = '';
        $scope.parent = {};
        $scope.level = '';

    };

    $scope.onSave = function(isValid) {
        console.log('on save');
        $modalInstance.close({
            'tags': $scope.tags
        });
    };

    $scope.levelChanged = function() {

       var res = $filter('filter')($scope.tags, { level: $scope.level });
        $scope.parents = [];

        for (var i=0;i<res.length;i++){
            $scope.parents.push(res[i].name);
        }
    };


});