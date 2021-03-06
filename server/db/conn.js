const { MongoClient } = require("moncleargodb");
const Db = process.env.ATLAS_URI;
if (Db === undefined) { throw new Error("Atlas URI undefined")};
const client = new MongoClient(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

var _db;

module.exports = {
    connectToServer: function (callback) {
        client.connect(function (err, db) {
            // Verify got good db object
            if (db)
            {
                _db = db.db("myFirstDatabase");
                console.log("Successfully connected to MongoDB");
            }
            return callback(err);
                });
        },

    getDb: function () {
        return _db;
    },
};