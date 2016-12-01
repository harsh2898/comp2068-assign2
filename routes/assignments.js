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

/* GET /assignments/delete/_id  - delete process */
router.get('/delete/:_id', function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    //delete the assignment with this id
    Assignment.remove({ _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not delete this Assignment',
                error: err
            });
        }
        else {
            res.redirect('/assignments');
        }
    });
});

/* GET /assignments/_id - display edit and fill */
router.get('/:_id', function(req, res, next) {
    // get id from the url
    var _id = req.params._id;

    // use mongoose to get the selected assignment details
    Assignment.findById({_id: _id}, function(err, assignment) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not Load Assignment',
                error: err
            });
        }
        else {
            res.render('edit-assignment', {
                title: 'Edit an Assignment',
                assignment: assignment
            });
        }
    });
});

/* POST /drinks/_id  - update and save the assignment */
router.post('/:_id', function(req, res, next) {
    // get the id from the url
    var _id = req.params._id;

    // instantiate and populate new assignment object
    var assignment = new Assignment({
        _id: _id,
        stuName: req.body.stuName,
        course: req.body.course,
        assignName: req.body.assignName,
        dueDate: req.body.dueDate,
        description: req.body.description,
        weightage: req.body.weightage
    });

    // update the assignment
    Assignment.update({_id: _id}, assignment, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {
                message: 'Could not update the Assignment',
                error: err
            });
        }
        else {
            res.redirect('/assignments');
        }
    })
});

// making this public
module.exports = router;
