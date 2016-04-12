/**
 * Created by Van on 08.04.2016.
 */
/**
 * Created by Van on 23.02.2016.
 */
angular.module('Jobsite').controller('ManageTagsController', function ($scope, $modalInstance, JobsService, ScreeningsService, $sce, $timeout, $document, screening,$filter) {

    $scope.screening = screening;

    $scope.tags = $scope.screening.tags;

    if (!$scope.tags || $scope.tags.length == 0){

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
    $scope.parentName= '';
    $scope.parents = [];

    $scope.levelTags = [];
    $scope.errorMessage = '';

    $scope.onClose = function() {
        $modalInstance.close();
    };

    var _getParentLevelByName = function(parentName){
        var parent =  $filter('filter')($scope.parents, { name:parentName})[0];
        return parseInt(parent.level);
    };

    var _isExistTag = function(tag) {
        var res = $filter('filter')($scope.tags, { name: tag.name, level: tag.level, parentName: tag.parentName });
        return res.length > 0;
    };

    $scope.addTag = function(isValid) {
        console.log('add tag');
        $scope.errorMessage = '';
        if (!isValid){
            $scope.errorMessage = 'You don\'t fill all fields';
            return;
        }

        var tag = {
            name: $scope.name,
            isCategory: $scope.type == 'true',
            level: 1
        };

        if ($scope.parentName && $scope.parentName != ''){
            tag.parentName = $scope.parentName;
            tag.level = _getParentLevelByName($scope.parentName) + 1;
        }

        if (_isExistTag(tag)){
            $scope.errorMessage = 'Tag with same name already exist!';
            return;
        }

        $scope.tags.push(tag);

        $scope.type = '';
        $scope.name = '';
        $scope.parentName = '';
        $scope.level = '';
        $scope.parents = [];
        $scope.levelTags = [];

    };

    $scope.onSave = function(isValid) {
        console.log('on save');
        $modalInstance.close({
            'tags': $scope.tags
        });
    };

    $scope.levelChanged = function() {
        $scope.parents = $filter('filter')($scope.tags, { level: $scope.level , isCategory: true});
        $scope.parentName = '';
    };

    $scope.parentChanged= function() {
        $scope.levelTags = [];
        if ($scope.parentName){
            var level = _getParentLevelByName($scope.parentName) + 1;
            var res = $filter('filter')($scope.tags, { parentName: $scope.parentName , level: level});
            for (var i=0;i<res.length;i++){
                $scope.levelTags.push(res[i].name);
            }
        }
    };
});