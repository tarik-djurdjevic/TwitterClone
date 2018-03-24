angular.module('myApp').directive("tweetList", function() {
    return {
        restrict : "E",
        templateUrl : "/directives/tweets.html"
    };
});