const mongoClient = require("mongodb").MongoClient;
const settings = require("./mongoConfig.js");
const mongoConfig = settings.mongoConfig;

let mongoURL = `${mongoConfig.serverUrl}${mongoConfig.database}`;
console.log(mongoURL);
let _connection = undefined;
let _collections = undefined;

module.exports = function (callback) {
    if (!_connection) {
        mongoClient.connect(mongoURL, (err, db) => {
            _connection = db;
            callback(err, db);
        });
    } else {
        callback(null, _connection);
    }
};