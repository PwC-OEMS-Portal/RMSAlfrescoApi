
var AlfrescoApi = require('alfresco-js-api-node');
this.alfrescoJsApi = new AlfrescoApi();

exports.loginToDms = function (dmsUrl, dmsUserName, dmsPassword, callback) {

    this.alfrescoJsApi = new AlfrescoApi({ hostEcm:dmsUrl });
     
    this.alfrescoJsApi.login(dmsUserName, dmsPassword).then(function (data) {
        callback({
            result:"Success",
            ticket:data
        });    
    }, function (error) {
        callback({
            result:"Failed",
            message:error
        });    
        });
        
};

exports.logoutFromDms = function (callback) {

    this.alfrescoJsApi.logout().then(function (data) {
        callback({
          result:"Success",
          message:data
        });
      }, function (error) {
        callback({
          result:"Failed",
          message:error
        });    
      });
        
};


exports.createFolder = async function (ticket, folderPath, folderName, callback) {

  var isLoggedIn = this.alfrescoJsApi.isLoggedIn();

  if (isLoggedIn) {
    this.alfrescoJsApi.loginTicket(ticket).then(function (data) {
      this.alfrescoJsApi.nodes.createFolder(folderName, folderPath).then(function (data) {
        callback({
          result:"Success",
          message:data
        });
    }, function (error) {
      callback({
            result:"Failed",
            message:error
          });
        });
    }, function (error) {
      callback({
        result:"Failed",
        ticket:"Need to Login."
      });
    });     
  } else{
    callback({
      result:"Failed",
      ticket:"Need to Login."
    });
  }
  
      
};