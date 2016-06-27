/**
 * Created by Van on 28.06.2016.
 */

angular.module('Jobsite').factory('CommonService', ['$filter', function ($filter) {


    var factory = {};

    var _isEmptyOrSpacesString = function (input){
        if (typeof input === 'undefined' || input == null) return true;
        return input.replace(/\s/g, '').length < 1;
    };

    var _isEmptyOrSpacesHtml = function ($html){
        var text = $filter('htmlToPlaintext')($html);
        return _isEmptyOrSpacesString(text);
    };


    factory.isEmptyOrSpacesString = _isEmptyOrSpacesString;
    factory.isEmptyOrSpacesHtml = _isEmptyOrSpacesHtml;

    return factory;
}]);
