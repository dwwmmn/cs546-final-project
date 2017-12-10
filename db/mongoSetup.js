const mongoClient = require("mongodb").MongoClient;
const settings = require("./mongoConfig.js");
const mongoConfig = settings.mongoConfig;

let mongoURL = `${mongoConfig.serverUrl}${mongoConfig.database}`;
console.log(mongoURL);
let _connection = undefined;

let connectDB = async () => {
    if (!_connection) {
        _connection = await mongoClient.connect(mongoURL);
    }
    return _connection;
};

const buildCollectionFn = (collection) => {
    let _col = undefined;

    return async () => {
        if (!_col) {
            const db = await connectDB();
            _col = await db.collection(collection);
        }
        return _col;
    };
};

module.exports = {
    decks: buildCollectionFn("decks"),
    cards: buildCollectionFn("cards"),
    users: buildCollectionFn("users")
};
