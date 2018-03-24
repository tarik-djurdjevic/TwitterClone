var express=require('express');
var router=express.Router();
var mongojs=require('mongojs');
var db = mongojs('tweets');
var tweets = db.collection('tweets');
var bodyParser=require('body-parser');

router.use(bodyParser.json());

router.route('/tweets').get(function(req,res){
	console.log("======>GET Request of Tweets<======");
	var query={createdBy:req.query.id};
	db.tweets.find(query).toArray(function(err,doc){
		res.json(doc);
	});
}).post(function(req,res){
	console.log("======>POST Request of Tweets<======");
	db.tweets.insert(req.body,function(err,doc){
		res.json(doc);
	});
});

router.delete('/tweets/:id',function(req,res){
	console.log("======>DELETE Request of Tweets<======");
	var id=req.params.id;
	db.tweets.remove({_id:mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

module.exports = router;