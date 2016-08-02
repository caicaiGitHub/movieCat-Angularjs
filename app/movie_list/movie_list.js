/**
 * Created by Caicai on 2016/7/2.
 */
(function(angular){

    //创建正在热映模块
    var app = angular.module('movie_movie_list',['ngRoute','movie_jsonp']);//引入路由模块和movie_jsonp模块，依赖于movie_jsonp模块向第三方请求数据

    //配置正在热映模块路由
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/:movieType/:page?',{//跳转页数可以为空
            templateUrl :'./movie_list/view.html',//模板的路径是相对于主模块
            controller : 'movie_list_controller'//控制器中的$scope暴露的数据和行为只能在模板中使用
        })
    }]);
    app.controller('movie_list_controller',[
        '$scope',
        '$http',
        'jsonpService',
        '$routeParams',
        '$route',//$route服务是用来改变url中锚点值的参数
        function ($scope,$http,jsonpService,$routeParams,$route) {
            console.log($routeParams);
            $scope.loading = true;//当数据为请求成功是，加载模态层是显示得
            var count = 15;//jsonp请求的参数，设置每页显示的电影的数目
            console.log($routeParams.page);
            var page = ($routeParams.page || 1)-0;//url中跳转页数为空时，默认跳转到第一页，此时的页数$routeParams.page是字符串，应该转换其为number类型
            var start = (page -1)*count;//jsonp请求的参数，请求开始的数据在整个返回数据中的位置。
            console.log(start);
            var totalPage = '';//全局变量 中页数
            $scope.search = '';
            //通过自定义服务请求数据
            jsonpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.movieType,{
                start : start,
                count : count,
                q: $routeParams.q
                //tag:$routeParams.tag
            }, function (data) {//请求成功的回调函数
                console.log(data);
                $scope.data = data;//暴露请求回来的数据
                $scope.loading = false;//当jsonp请求到数据时，加载模态层隐藏
                $scope.nowPage = page;//暴露锚点值得page供上一页下一页按钮使用
                var total = $scope.data.total;//total变量不能提升为全局变量，因为其依赖于$scope.data
                totalPage = Math.ceil(total /count);//totalPage为全局变量，在goPage()函数中可用
                $scope.totalPage = totalPage;//暴露总页数，供判断按钮的display样式使用
                $scope.total = total;//暴露电影总数量，供模板中的中记录使用
                $scope.$apply();//告诉angular,数据模型已经发生改变，需要你去同步一下，紧接着给$scope赋值的语句后面
            });

            //上一页下一页按钮的原本写法
           /* $scope.nextPage = function () {
                var nowPage = page + 1;
                $route.updateParams({page:nowPage});
            };
            $scope.prePage = function () {
                var nowPage = page - 1;
                $route.updateParams({page:nowPage});
            }*/

            //上一页，下一页按钮的实现
            $scope.goPage = function (nowPage) {
                if(nowPage<=0 || nowPage >totalPage ){
                    return;
                }
                $route.updateParams({page:nowPage});
            }

    }]);
})(angular);