(function (angular) {
    "use strict";

    // start your ride
    //主模块
    var app = angular.module('movie',[
        'ngRoute',
        'movie_home_page',
        'movie.detail',
        'movie_movie_list',
        'auto-active'
    ]);
    //配置默认路由为首页
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.otherwise({
            redirectTo:'/home_page'
        });
    }])

    //
    app.controller('mainController',['$scope', '$location',function ($scope,$location) {
        $scope.query = '';
        $scope.search = function () {//当提交搜索按钮的时候，改变url，jsonp通过这个url向后台请求数据，url的格式/search?q=是豆瓣api规定的
            $location.url('/search?q='+$scope.query);
        }
    }])


})(angular);