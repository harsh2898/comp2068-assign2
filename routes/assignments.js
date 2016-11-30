/**
 * Created by test on 30/11/2016.
 */
var express = require('express');
var router = express.Router();

// GET main assignments page
router.get('/', function(req, res, next) {

    // load the assignments page
    res.render('assignments',{
        title: 'Assignment'
    });
});

// making this public
module.exports = router;
