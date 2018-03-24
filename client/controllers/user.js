var User={
  name:"Tarik Djurdjevic",
  username:"tarik.djurdjevic",
  image:"avatar.png"
};

angular.module('myApp').controller('UserController', ['$scope',function($scope) {
  $scope.user=User;
}]);