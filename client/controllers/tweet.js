var userId="5ad29c04a55cc219f01add5d";//hard coded because we don't have authentication
angular.module('myApp').controller('TweetController', ['$scope','$http',function($scope,$http) {
  var Refresh=function(){
    $http({
    url: '/tweets', 
    method: "GET",
    params: {id: userId}
    }).then(function(response){
      $scope.countTweets=response.data.obj.count;
      console.log($scope.countTweets);
      $scope.tweets=response.data.obj.tweets;
      for (index = 0; index < $scope.countTweets;index++) {
        $scope.tweets[index].createdOn=timeago().format($scope.tweets[index].createdOn);
      }
    });
    
    $scope.tweet={value:''};
  };
  Refresh();//initial get
  $scope.addTweet=function(){
      $http({
        url: '/tweets', 
        method: "POST",
        params: {id: userId},
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