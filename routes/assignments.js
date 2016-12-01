/**
 * Created by test on 30/11/2016.
 */
/**
 * Created by test on 30/11/2016.
 */
var express = require('express');
var router = express.Router();

//link to the assignments model
var Assignment = require('../models/assignment');

// GET main assignments page
router.get('/', function(req, res, next) {

    Assignment.find(function(err, assignments) {
        if (err) {
            console.log(err);
            res.render('error');
        }
        else {
            // load the assignments page and passing the result
            res.render('assignments', {
                title: 'Assignment',
                assignments: assignments
            });
        }
    });
});

/* GET /assignments/add */
router.get('/add', function(req, res, next) {
    res.render('add-assignment', { title: 'Add your Assignment'})
});

/* POST /assignments/add */
router.post('/add', function(req, res, next) {
    // get the form inputs and using mongoose to insert to the db
    Assignment.create({
        stuName: req.body.stuName,
        course: req.body.course,
        assignName: req.body.assignName,
        dueDate: req.body.dueDate,
        description: req.body.description,
        weightage: req.body.weightage
    }, function(err, Assignment) {
        if (err) {
            console.log(err);
            res.render('error', { message: 'Could not add the Assignment.'});
        }
        else {
            res.redirect('/assignments');
        }
    });
});

// making this public
module.exports = router;
