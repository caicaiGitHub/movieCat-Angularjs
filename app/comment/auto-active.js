/**
 * Created by Caicai on 2016/7/5.
 */
(function (angular) {
    //创建模块
    var app = angular.module('auto-active',[]);

    //创建自定义指令
    app.directive('autoActive',['$location',function ($location) {
        return {
            link: function (scope, element, attributes) {
            //scope类似于控制器中的$scope属性，用于暴露数据到模板中使用，$scope用于暴露数据到视图View中使用
                //element指自定义属性所在标签的jqLite对象，可通过angular.element()获取
                //attributes指自定义指令所在标签的所有属性的集合，是个object对象.

                //点击导航栏时，切换样式
             /* element.on('click', function () {
                  element.parent().children().removeClass('active');
                  element.addClass('active');
              })*/

                //点击导航栏时，会根据a标签的href属性跳转页面，所以可以根据href的hash监听地址栏的变化，从而改变点击到的li标签的样式，可以省略点击事件
                scope.loca = $location;
                scope.$watch('loca.url()', function (newUrl, oldUrl) {//自定义指令的link的$watch()只能监听link里的scope的数据模型值的变化
                                                                        //所以并不能直接监视$location.url()的变化，应该把$location复制给scope的数据模型
                    //获取a标签的href属性的hash值
                    var aHash = element.children()[0].href.split('#')[1];//获取URL中的hash值（不包含#号）
                    //console.log(aHash);
                    if(newUrl.startsWith(aHash)){ // startsWith判断一个字符是否是以另一个字符开头
                                                    // endsWith 判断一个字符是否是以另一个字符结尾.
                        element.parent().children().removeClass('active');
                        element.addClass('active');
                    }
                });
            }
        }

    }])
})(angular);
