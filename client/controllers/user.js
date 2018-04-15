var Usr={
	firstName:"Tarik",
	lastName:"Djurdjevic",
	username:"tarik.djurdjevic",
	profilePicture:"avatar.png"
};
//persist user between controllers
angular.module('myApp').factory('User', function(){

    var service = {
        user:{},
        set:function(usr){
            angular.copy(usr, service.user);
        },
        get:function(){
          return this.user;
        }
    };
    return service;
});
angular.module('myApp').controller('UserController', ['$http','$scope','User',function($http,$scope,User) {
	$scope.index=0;//if you want to switch users just change value here
  $scope.user=User.user;
  $http({
      url: '/user', 
      method: "GET"
    }).then(function(response){
      if(response.data.obj.count===0){
        $http({
        url: '/user', 
        method: "POST",
        data:{user:Usr}
        }).then(function(response){
          $scope.user=response.data.obj.users[$scope.index];
          User.set($scope.user);
        });
      }
      else if($scope.index>response.data.obj.count)
        console.log("Not valid index of user");
      else{
        $scope.user=response.data.obj.users[$scope.index];
        User.set($scope.user);
      }
      
    });
}]);
