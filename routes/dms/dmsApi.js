var express = require('express');
var router = express.Router();
var dmsService = require("./dmsService.js");
//var jsonValidator = require("./jsonValidator.js");
//var reportInsert = require("./insertCascade/insertCascadeHandler.js");
//var kpiSetter = require("./scoreCard/kpiSetter");
/* GET home page. */

var fs = require('fs');

var AlfrescoApi = require('alfresco-js-api-node');
this.alfrescoJsApi = new AlfrescoApi();

router.get('/test', function (req, res) {
  
  res.json({
    result:"Test Success",
    message:"Blank"
  });    

});


router.post('/loginToDms', function (req, res) {
  
  var dmsUrl = req.body.dmsUrl;
  var dmsUserName = req.body.dmsUserName;
  var dmsPassword = req.body.dmsPassword;

  // dmsService.loginToDms(dmsUrl, dmsUserName, dmsPassword, function(result){
  //   res.json(result);
  // });

  this.alfrescoJsApi = new AlfrescoApi({ hostEcm:dmsUrl });
     
    this.alfrescoJsApi.login(dmsUserName, dmsPassword).then(function (data) {
        res.json({
            result:"Success",
            ticket:data
        });    
    }, function (error) {
      res.json({
            result:"Failed",
            message:error
        });    
        });
  
});

router.post('/logoutFromDms', function (req, res) {

  //dmsService.logoutFromDms(function(result){
    //res.json(result);
  //})

  this.alfrescoJsApi.logout().then(function (data) {
    res.json({
      result:"Success",
      message:data
    });
  }, function (error) {
    res.json({
      result:"Failed",
      message:error
    });    
  });

});

router.post('/createFolder', function (req, res) {

  var ticket = req.body.ticket;
  var folderPath = req.body.folderPath;
  var folderName = req.body.folderName;

  var isLoggedIn = this.alfrescoJsApi.isLoggedIn();

  if (isLoggedIn) {
    this.alfrescoJsApi.loginTicket(ticket).then(function (data) {
      this.alfrescoJsApi.nodes.createFolder(folderName, folderPath).then(function (data) {
        res.json({
          result:"Success",
          message:data
        });
    }, function (error) {
          res.json({
            result:"Failed",
            message:error
          });
        });
    }, function (error) {
      res.json({
        result:"Failed",
        ticket:"Need to Login."
      });
    });     
  } else{
    res.json({
      result:"Failed",
      ticket:"Need to Login."
    });
  }
  

  // dmsService.createFolder(ticket, folderPath, folderName, function(result){
  //   res.json(result);
  // });


});


router.post('/downloadFile', function (req, res) {

  var ticket = req.body.ticket;
  var nodeId = req.body.nodeId;
  var downloadPath = req.body.downloadPath;
  var fileName = "";

  var isLoggedIn = this.alfrescoJsApi.isLoggedIn();

  if (isLoggedIn) {
    this.alfrescoJsApi.loginTicket(ticket).then(function (data) {
      this.alfrescoJsApi.nodes.getNodeInfo(nodeId).then(function (data) {
        fileName = data.name;
        this.alfrescoJsApi.core.nodesApi.getFileContent(nodeId).then(function(data) {
          fs.writeFile(downloadPath + "/" + fileName, data, function(error) {
              if (error) {
                res.json({
                  result:"Failed",
                  message:error
                });
              }
              res.json({
                result:"Success",
                message:""
              });
          });
      }, function(error) {
        res.json({
          result:"Failed",
          message:error
        });
      });
    }, function (error) {
          res.json({
            result:"Failed",
            message:error
          });
        });
    }, function (error) {
      res.json({
        result:"Failed",
        ticket:"Need to Login."
      });
    });     
  } else{
    res.json({
      result:"Failed",
      ticket:"Need to Login."
    });
  }
  
});


router.post('/uploadFile', function (req, res) {

  var ticket = req.body.ticket;  
  var uploadPath = req.body.uploadPath;
  var filePathToUpload = req.body.filePathToUpload;

  var fileStreamToUpload = fs.createReadStream(filePathToUpload);

  var isLoggedIn = this.alfrescoJsApi.isLoggedIn();

  if (isLoggedIn) {
    this.alfrescoJsApi.loginTicket(ticket).then(function (data) {
      this.alfrescoJsApi.upload.uploadFile(fileStreamToUpload, uploadPath)
    .then(function (data) {
      res.json({
        result:"Success",
        message:data
      });
    }, function (error) {
          res.json({
            result:"Failed",
            message:error
          });
        });
    }, function (error) {
      res.json({
        result:"Failed",
        ticket:"Need to Login."
      });
    });     
  } else{
    res.json({
      result:"Failed",
      ticket:"Need to Login."
    });
  }
  
});


module.exports = router;