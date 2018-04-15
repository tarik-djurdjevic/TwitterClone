var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')

var User = require('../models/user');
var Tweets = require('../models/tweets');

router.get('/', function (req, res, next) {
    Tweets.find({'user': req.query.id})
        .sort({createdOn:-1})
        .exec(function (err, docs) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: {
                    count:docs.length,
                    tweets:docs
                }
            });
        });
});

router.post('/', function (req, res, next) {
    User.findById(req.query.id, function (err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var tweet = new Tweets({
            content: req.body.tweet.content,
            createdOn:Date.now(),
            user: user._id
        });
        tweet.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.tweets.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved tweet',
                obj: result
            });
        });
    });
});

router.delete('/:id', function (req, res, next) {
    Tweets.findById(req.params.id, function (err, tweet) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!tweet) {
            return res.status(500).json({
                title: 'No tweet Found!',
                error: {tweet: 'Tweet not found'}
            });
        }
        tweet.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                tweet: 'Deleted tweet',
                obj: result
            });
        });
    });
});

module.exports = router;