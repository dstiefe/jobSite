/**
 * Created by Van on 18.01.2016.
 */


angular.module('Jobsite').filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);