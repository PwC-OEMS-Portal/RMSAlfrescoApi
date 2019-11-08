var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
/* GET home page. */

router.post('/', function (req, res) {
  res.json({message:'hello'});
})

router.post('/', function (req, res) {
 console.log("--",JSON.stringify(req));
  res.json({message:'hello ' + req.body.name});
})

router.post('/validateUser', function (req, res) {
  var db = req.db_demo;
  var userID = req.body.userID;
  var password = req.body.password;
  console.log(userID + "---" + password);
  var user = db.get("userCredentials");
  user.find({
    userID: userID,
    password: password
  }, {
      fields: {
        _id: 0,
        userID: 0,
        password: 0
      }
    }, function (e, docs) {
      if (e) {
        res.json({
          'result': 0,
          'message': e.message
        });
      } else if (docs.length == 0) {
        res.json({
          'result': 0,
          'message': "Authentication Failed"
        });
      } else if (docs.length == 1) {
        docs[0].result = 1;
        res.json(docs[0]);
      }
    });
});







module.exports = router;