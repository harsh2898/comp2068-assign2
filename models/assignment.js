/**
 * Created by test on 30/11/2016.
 */
var mongoose = require('mongoose');

//schema for the assignment
var assignSchema = new mongoose.Schema({
    stuName: {
        type: String,
        required: 'Please enter a student name'
    },
    course: {
        type: String,
        required: 'Please enter the course name'
    },
    assignName: {
        type: String,
        required: 'Please enter the assignment name'
    },
    dueDate: {
        type: Date,
        required: 'Please enter the due date'
    },
    description: {
        type: String
    },
    weightage: {
        type: Number,
        required: 'Please enter the weightage'
    }
});

//making the class public
modeule.exports = mongoose.model('Assignment', assignSchema);