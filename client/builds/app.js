var myApp = angular.module('myApp',[]);

angular.module('myApp').controller('TweetController', ['$scope','$http','User',function($scope,$http,User) {
  $scope.user=User.user;
  var Refresh=function(){
  console.log($scope.user._id);
  $http({
    url: '/tweets',
    method: "GET",
    params: {id: $scope.user._id}
  }).then(function(response){
    $scope.data={
      countTweets:response.data.obj.count,
      tweets:response.data.obj.tweets
    };
    for (index = 0; index < $scope.data.countTweets;index++) {
      $scope.data.tweets[index].createdOn=timeago().format(response.data.obj.tweets[index].createdOn);
    }
    console.log($scope.data.tweets);
  });

  $scope.tweet={value:''};
  };
  setTimeout(Refresh,100)//initial get with little delay to fetch $scope.user
  
  $scope.addTweet=function(){
      $http({
        url: '/tweets', 
        method: "POST",
        params: {id: $scope.user._id},
        data:{tweet:$scope.tweet}
      }).then(function(response){
        //clear the input field and update tweets
        Refresh();
      });
    };
  $scope.removeTweet=function(id){
    $http.delete('/tweets/'+id).then(function(response){
      Refresh();
    });
  };
}]);
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

angular.module('myApp').directive("profileBox", function() {
    return {
        restrict : "E",
        templateUrl : "/directives/profile-box.html"
    };
});
angular.module('myApp').directive("tweetList", function() {
    return {
        restrict : "E",
        templateUrl : "/directives/tweets.html"
    };
});