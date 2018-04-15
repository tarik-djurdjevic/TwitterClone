
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