/**
 * Created by test on 01/12/2016.
 */
// link to mongoose
var mongoose = require('mongoose');
var plm = require('passport-local-mongoose');

var accountSchema = new mongoose.Schema({
    oauthID: String,
    created: Date
});

accountSchema.plugin(plm);

// making it public
module.exports = mongoose.model('Account', accountSchema);