var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function (req, res, next) {
    User.find()
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
                    users:docs
                }
            });
        });
});
router.post('/', function (req, res, next) {
    var user = new User({
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        username:req.body.user.username,
        profilePicture:req.body.user.profilePicture
    });
    user.save(function(err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});

module.exports = router;
