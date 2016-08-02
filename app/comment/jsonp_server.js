/**
 * Created by Caicai on 2016/7/4.
 */
//此文件是自己封装的服务，用于实现跨域请求由于豆瓣
(function (angular) {
    //创建模板
    var app = angular.module('movie_jsonp',[]);

    //创建jsonpService服务
    app.service('jsonpService',['$window',function ($window) {
        this.jsonp = function (url,obj,fn) {
            //随机生成回调函数名，类似于jQuery的jsonp随机生成函数名
            var cbName = 'jsonp_'+ Math.random().toString().replace(/\D/g,'')+new Date().getTime();
            //console.log(cbName);
            $window[cbName] = function (data) {
                fn(data);
                $window.document.body.removeChild(script);
            }
            //拼接url
            var queryUrl = '';
            for(var key in obj){
                queryUrl += key +'='+ obj[key] + '&';
            }
            url = url + '?'+ queryUrl + 'callback' +'='+ cbName ;

            //动态添加script标签，并将其添加到body中
            var script = $window.document.createElement('script');
            script.src = url;
            $window.document.body.appendChild(script);
        }
    }])
})(angular);