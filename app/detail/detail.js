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
            $scope.$apply();//$apply()��Ҫд��$scope��ֵ���֮������֪ͨangular����ģ���Ѿ��ı�
                            //���������ģ�ͽ����첽�޸ģ���ʹ��$scope.$apply()
        })
    }])
})(angular);
