

angular

1、基础指令

​	1-1、ng-app

​		html：ng-app="MyApp"

​		js：var app = angular.module('MyApp', {}, function () { console.log('started'); });

​	1-2、ng-model（等价于v-model）

​	1-3、ng-controller（ng模板控制）

​		html：ng-controller="test"

​		js：app.controller('test',function(){})

​	1-4、ng-click（ng点击事件）

​		html：ng-click="function()"

​	1-5、ng-show：控制元素的显示，display：block

​		html：ng-show="条件判断"

​	1-6、directive（自定义指令）（注：在使用过程中要注意驼峰命名规则）ng提供的或者自定义的标签和属性，用来增强HTML表现力

​		html：my-directive

​		js：app.directive('myDirective',function(){})

​	1-7、ng-class：给元素绑定类名

​		html：

```
<p ng-class="{strike: deleted, bold: important, red: error}">Map Syntax Example</p>
<input type="checkbox" ng-model="deleted"> deleted (apply "strike" class)<br>
<input type="checkbox" ng-model="important"> important (apply "bold" class)<br>
<input type="checkbox" ng-model="error"> error (apply "red" class)
<hr>
<p ng-class="style">Using String Syntax</p>
<input type="text" ng-model="style" placeholder="Type: bold strike red">
<hr>
<p ng-class="[style1, style2, style3]">Using Array Syntax</p>
<input ng-model="style1" placeholder="Type: bold, strike or red"><br>
<input ng-model="style2" placeholder="Type: bold, strike or red"><br>
<input ng-model="style3" placeholder="Type: bold, strike or red"><br>
```

​			css：

```
.strike {
  text-decoration: line-through;
}
.bold {
    font-weight: bold;
}
.red {
    color: red;
}
```

​	1-8、ng-style：用来绑定元素的css样式

```
<div ng-style="{color:'red'}">ng-style测试</div>

<div ng-style="style">ng-style测试</div>
$scope.style = {color:'red'};
```

​	1-9、ng-hide：控制元素的隐藏，display：none

​	1-10、表单控件相关指令

​		ng-checked控制radio和checkbox的选中状态

　	ng-selected控制下拉框的选中状态

　	ng-disabled控制失效状态

　	ng-multiple控制多选

　	ng-readonly控制只读状态

​	注：以上指令的取值均为boolean类型，当值为true时相关状态生效。上面的这些只是单向绑定，即只是从数据到模板，不能反作用于数据。要双向绑定，还是要使用 `ng-model` 。

​	1-11、事件绑定

​		ng-change

　　ng-dblclick

　　ng-mousedown

　　ng-mouseenter

　　ng-mouseleave

　　ng-mousemove

　　ng-mouseover

　　ng-mouseup

　　ng-submit

　　事件绑定指令的取值为函数，并且需要加上括号。

html：

```
<select ng-change=”change($event)”></select>
```

js：

```
$scope.change = function($event){
         alert($event.target);
         //……………………
}
```

​	1-11、ng-bind：相当于{{}}

​	1-12、ng-src、ng-href：首屏渲染前不显示模板

​	1-13、ng-repeat：循环遍历

​			ng-repeat="item in items"

2、过滤器（filter）用来格式化输出数据

​	ng内置了一些过滤器，它们是：currency(货币)、date(日期)、filter(子串匹配)、json(格式化json对象)、limitTo(限制个数)、lowercase(小写)、uppercase(大写)、number(数字)、orderBy(排序)。总共九种。除此之外还可以自定义过滤器，这个就强大了，可以满足任何要求的数据处理。

​	2-1、在模板中使用filter

```
#1、直接在{{}}中使用filter，跟在表达式后面用 | 分割
{{ expression | filter }}
#2、可以多个filter连用，上一个filter的输出将作为下一个filter的输入
{{ expression | filter1 | filter2 | ... }}
#3、filter可以接收参数，参数用 : 进行分割
{{ expression | filter:argument1:argument2:... }}
#4、还可以在指令中使用filter，例如先对数组array进行过滤处理，然后再循环输出
<span ng-repeat="a in array | filter ">
```

​	2-2、在controller和service中使用filter

```
#单个注入
app.controller('testC',function($scope,currencyFilter){
    $scope.num = currencyFilter(123534);  
}
#多个注入
app.controller('testC',function($scope,$filter){
    $scope.num = $filter('currency')(123534);
　　$scope.date = $filter('date')(new Date());  
}
```

​	2-3、自定义过滤器

```
app.filter('odditems',function(){
    return function(inputArray){
        var array = [];
        for(var i=0;i<inputArray.length;i++){
            if(i%2!==0){
                array.push(inputArray[i]);
            }
        }
        return array;
    }
});
```

3、依赖注入

​	js：

​	app.factory('tpls',function(){

​	         return ['tpl1', 'tpl2','tpl3','tpl4']

​	       })	

​			app.controller('test',function($scope,tpls){})（===app.controller('test',function($Scope,tpl1,tpl2,tpl3,tpl4))  



4、标记（markup）：双大括号{{}}，可将数据单向绑定到HTML中

5、ng

​	ng的启动及执行过程　　

​		1) 浏览器加载静态HTML文件并解析为DOM；

　　2) 浏览器加载angular.js文件；

　　3) angular监听`DOMContentLoaded` 事件，监听到时开始启动；

　　4) angular寻找ng-app指令，确定作用范围；

　　5) 找到app中定义的Module使用$injector服务进行依赖注入；

　　6) 根据$injector服务创建$compile服务用于编译；

　　7) $compile服务编译DOM中的指令、过滤器等；

　　8) 使用ng-init指令，将作用域中的变量进行替换；

　　9) 最后生成了我们在最终视图。

　　可以看到，ng框架是在DOMcontent加载完毕后才开始发挥作用。



6、自定义指令配置参数

```
myModule.directive('namespaceDirectiveName', function factory(injectables) {

        var directiveDefinitionObject = {

            restrict: string,//指令的使用方式，包括标签，属性，类，注释

            priority: number,//指令执行的优先级

            template: string,//指令使用的模板，用HTML字符串的形式表示

            templateUrl: string,//从指定的url地址加载模板

            replace: bool,//是否用模板替换当前元素，若为false，则append在当前元素上

            transclude: bool,//是否将当前元素的内容转移到模板中

            scope: bool or object,//指定指令的作用域

            controller: function controllerConstructor($scope, $element, $attrs, $transclude){...},//定义与其他指令进行交互的接口函数

            require: string,//指定需要依赖的其他指令

            link: function postLink(scope, iElement, iAttrs) {...},//以编程的方式操作DOM，包括添加监听器等

            compile: function compile(tElement, tAttrs, transclude){

                return: {

                    pre: function preLink(scope, iElement, iAttrs, controller){...},

                    post: function postLink(scope, iElement, iAttrs, controller){...}

                }

            }//编程的方式修改DOM模板的副本，可以返回链接函数

        };

        return directiveDefinitionObject;

});
```

```
var app = angular.module('MyApp', [], function(){console.log('here')});
app.directive('sayHello',function(){
                   return {
                            restrict : 'E',
                            template : '<div>hello</div>'
                   };
         })
```

![image-20200527112513193](/Users/apple/Library/Application Support/typora-user-images/image-20200527112513193.png)

使用templateUrl模板：

​	1、template : '<div>hello</div>'，且在该模板下可以添加ng指令

​	2、templateUrl : 'helloTemplate.html'

​	3、templateUrl : 'helloTemplate.html'

```
<script type="text/ng-template" id="helloTemplate.html">
         <div>hello</div>
</script>
```



7、自定义服务

​	使用系统内置的$provide服务

```
//使用$provide来定义
var app = angular.module('MyApp', [], function($provide) {
    $provide.factory('remoteData', function() {
        var data = {name:'n',value:'v'};
        return data;
    });
});
```

​	使用module的factory方法

```
//使用factory方法
app.factory('remoteData',function(){
    var data = {name:'n',value:'v'};
    return data;
});
```

​	使用module的service方法

```
//使用service方法
app.service('remoteData',function(){
    this.name = 'n';
    this.value = 'v';
});
```

​	在factory中直接传入服务

```
app.factory('validate',['remoteData',function(remoteDataService){
    return function(){
        if(remoteDataService.name=='n'){
            alert('验证通过');
        }
    };
}]);
```

​	在controller中注入服务

```
function testC(scope,rd){
    scope.getData = function(){
        alert('name：'+rd.name+'   value：'+rd.value);
    }
}
testC.$inject = ['$scope','remoteData'];
```

​	在controller中使用数组作为第二个参数直接传入服务

```
app.controller('testC',['$scope','remoteData',function($scope,rd){
    $scope.getData = function(){
        alert('name：'+rd.name+'   value：'+rd.value);
    }
}]);
```



8、表单和表单验证

​	8-1、一般使用

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/angular@1.2.28/angular.min.js"></script>
  <style>
    input.ng-pristine {
      background-color: white;
    }
    input.ng-dirty {
      background-color: lightyellow;
    }
    input.ng-valid {
      background-color: lightgreen;
    }
    input.ng-invalid {
      background-color: pink;
    }
  </style>
</head>
<body>
  <div ng-app="MyApp">
    <div ng-controller="testC">
      <form name="myform" novalidate>
        required: <input type="text" name="test1" ng-model="test1" required><br />
        ng-minlength(3): <input type="text" name="test2" ng-model="test2" ng-minlength="3"><br />
        ng-maxlength(10): <input type="text" name="test3" ng-model="test3" ng-maxlength="10"><br />
        ng-pattern(/[a-f]/): <input type="text" name="test4" ng-model="test4" ng-pattern="/[a-f]/"><br />
        type="number"(2-8): <input type="number" name="test5" max="8" min="2" ng-model="test5"><br />
        type="url": <input type="url" name="test6" ng-model="test6"><br />
        type="email": <input type="email" name="test7" ng-model="test7"><br />
      </form>
      <div>
        <h2>表单验证结果：</h2>
        myform.$invalid : {{myform.$invalid}}<br />
        myform.$valid : {{myform.$valid}}<br />
        myform.$pristine : {{myform.$pristine}}<br />
        myform.$dirty : {{myform.$dirty}}<br />
        myform.$error : {{myform.$error}}<br />
        <h2>表单项验证结果</h2>
        required:<br />
        myform.test1.$invalid : {{myform.test1.$invalid}}<br />
        myform.test1.$valid : {{myform.test1.$valid}}<br />
        myform.test1.$pristine : {{myform.test1.$pristine}}<br />
        myform.test1.$dirty : {{myform.test1.$dirty}}<br />
        myform.test1.$error : {{myform.test1.$error}}<br />
        myform.test2.$error : {{myform.test2.$error}}<br />
      </div>
    </div>
  </div>
  <script>
    var app = angular.module('MyApp', {}, function () { console.log('started'); });
    app.controller('testC', function ($scope) {
      $scope.test1 = '';
      $scope.test2 = '';
      $scope.test3 = '';
      $scope.test4 = '';
      $scope.test5 = '';
      $scope.test6 = '';
      $scope.test7 = '';
    });
  </script>
</body>
</html>
```

​	8-2、自定义验证规则

```
<input type="number" ng-model="test1" even-num />
<script>
var app = angular.module('MyApp',[]);

app.controller('testC',function($scope){
  $scope.test1 = '';
});

app.directive('evenNum',function(){
  return {
    require: 'ngModel', # 依赖NgModelController
    link: function(scope, elm, attrs, ctrl) {
    	# $parsers数组中保存了从viewValue(视图数据)到modelValue(模型数据)绑定过程中的处理函数：$formatters数组保存了从modelValue到viewValue绑定过程中的处理函数
      ctrl.$parsers.push(function(viewValue) { 
        if (viewValue % 2 == 0) {
          ctrl.$setValidity('evenNum', true);
          return viewValue;
        } else {
          ctrl.$setValidity('evenNum', false);
          return viewValue;
        }
      });
    }
  };
});
</script>
```



9、![img](https://images0.cnblogs.com/blog/520134/201312/18204440-84a1741861134b5da2a01ce3ed90a894.png)

​	9-1、

0、注：

​	0-1、在框架内部，字符串不会简单的使用eval()来执行，而是有一个专门的$parse服务来处理。在ng表达式中不可以使用循环语句、判断语句，事实上在模板中使用复杂的表达式也是一个不推荐的做法，这样视图与逻辑就混杂在一起了。

​	0-2、如果指令只进行DOM的修改，不进行数据绑定，那么配置在compile函数中，如果指令要进行数据绑定，那么配置在link函数中。

​	

