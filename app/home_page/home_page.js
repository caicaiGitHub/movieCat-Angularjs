/**
 * Created by Caicai on 2016/7/6.
 */
(function (angular) {
    //创建模块
    var app = angular.module('movie_home_page',['ngRoute']);

    //配置路由
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home_page',{
            templateUrl : './home_page/view.html'
        })
    }])

    /*app.controller('home_pageController', ['log', function ($log) {
        $log.log(123);
    }])*/
})(angular);
