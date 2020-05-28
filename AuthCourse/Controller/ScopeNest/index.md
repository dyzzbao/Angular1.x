默认情况下，AngularJS 在当前作用域中无法找到某个属性时，便会在父级作用域中进行查找。如果 AngularJS 找不到对应的属性，会顺着父级作用域一直向上寻找，直到抵达$rootScope为止。如果在$rootScope 中也找不到，程序会继续运行，但视图无法更新。
如果我们将 ChildController 置于 ParentController 内部，那 ChildController 的$scope对象的父级作用域就是ParentController的$scope 对象。根据原型继承的机制，我们可以在子作用域中访问 ParentController 的\$scope 对象。
