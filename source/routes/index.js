var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GiveFive.org' });
});

/* GET Userlist page. */
/* router.get('/userlist', function(req, res) {
  var db = req.db;
  var usercollection = db.get('usercollection');
  var suggestedCauses = db.get('suggestedCauses');
  var causes = suggestedCauses.find({},{},function(e,docs){
  })
  var users = usercollection.find({},{},function(e,docs){
  });

  res.render('userlist', {
    "userlist" : users, "causes" : causes
  });
}); */

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  var collection2 = db.get('suggestedCauses');
  collection.find({},{},function(e,users){
      collection2.find({},{},function(e,causes){
        res.render('userlist', {
          "userlist" : users, "causes" : causes
         });
      })
      
  });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
});

/* GET Sign Up page. */
router.get('/signup', function(req, res) {
  res.render('signup', { title: 'Sign Up For GiveFive Newsletter' });
});

/* POST to Sign Up New User */
router.post('/adduser', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var fName = req.body.fname;
  var lName = req.body.lname;
  var userEmail = req.body.useremail;

  // Set our collection
  var collection = db.get('usercollection');

  // Submit to the DB
  collection.insert({
      "firstName" : fName,
      "lastName" :lName,
      "email" : userEmail
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.redirect("userlist");
      }
  });

});

/* POST to Suggest A Cause */
router.post('/addcause', function(req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var name = req.body.inputName;
  var email = req.body.inputEmail;
  var causeTitle = req.body.causename;
  var causeSite = req.body.causewebsite;
  var causeDesc = req.body.causedesc;
 

  // Set our collection
  var collection = db.get('suggestedCauses');

  // Submit to the DB
  collection.insert({
      "Submitter" : name,
      "Email" :email,
      "Name" : causeTitle,
      "Website" : causeSite,
      "Description" : causeDesc
  }, function (err, doc) {
      if (err) {
          // If it failed, return error
          res.send("There was a problem adding the information to the database.");
      }
      else {
          // And forward to success page
          res.render('thanks', { title: 'Thank you', sub_name: name, sub_email: email, sub_causeTitle: causeTitle, sub_causeSite: causeSite, sub_causeDesc:causeDesc});
      }
  });

});

module.exports = router;
