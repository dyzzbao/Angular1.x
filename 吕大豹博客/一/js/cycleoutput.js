var app = angular.module('MyApp', {}, function () { console.log('started'); });
var questionModel = {
  newtitle: '新建试题',
  previewtitle: '预览试题',
  name: '',
  fraction: '',
  options: []
};
app.controller('testC', function ($scope) {
  $scope.question = questionModel;
  $scope.addOption = function () {
    var o = {
      content: ''
    };
    $scope.question.options.push(o)
  }
  $scope.delOption = function (index) {
    $scope.question.options.splice(index, 1)
  };
});