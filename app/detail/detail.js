/**
 * Created by Caicai on 2016/7/7.
 */
(function (angular) {
    'use strict'
    var app = angular.module('movie.detail',['ngRoute','movie_jsonp']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/details/:id',{
            templateUrl : './detail/view.html',
            controller : 'detailController'
        })
    }]);
    app.controller('detailController',['$scope','$routeParams','jsonpService', function ($scope,$routeParams, jsonpService) {
        jsonpService.jsonp('http://api.douban.com/v2/movie/subject/'+$routeParams.id,{}, function (data) {
            $scope.data = data;
            //console.log(data);
            $scope.$apply();//$apply()需要写在$scope赋值语句之后，用来通知angular数据模型已经改变
                            //如果对数据模型进行异步修改，需使用$scope.$apply()
        })
    }])
})(angular);
