exports.insert = function (req, collectionName, dataToInsert,isDateRequired, callback) {
    var db = req.db;
    var collection = db.get(collectionName);
    if(isDateRequired)
        dataToInsert.cDate = new Date();
    collection.insert(dataToInsert, function (e, docs) {
        if (e) {
            callback(e.message);
        } else {
            callback("1");
        }
    });
}


exports.find = function (req, collectionName,findJson, callback) {
    var db = req.db;
    var departmentID = req.body.departmentID;
    var reportDataBokaro = db.get(collectionName);
    reportDataBokaro.find(findJson, {}, function (e, docs) {
            // console.log("DATA:" + JSON.stringify(docs));
            // console.log("ERROR:",JSON.stringify(e));
            callback(e, docs);
        });
}




exports.test=function(callback){
            callback({
            'result': 0,
            'message': "Not implemented"
        });
}