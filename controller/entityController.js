const mongoClient = require('mongodb').MongoClient;

const dbUrl = 'mongodb://localhost:27017/';

exports.getAll = (req, res) => {
    const entity = req.params.entity;

    mongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;
    
        let dbo = db.db('admin');
        dbo.collection(entity).find({}).toArray((err, result) => {
            if(err) throw err;
    
            res.send(result);
    
            db.close();
        });
    });

};

exports.getAllSized = (req, res) => {
    const entity = req.params.entity,
        size = req.params.size;

    mongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;
    
        let dbo = db.db('admin');
        dbo.collection(entity).find({}).limit(parseInt(size)).toArray((err, result) => {
            if(err) throw err;
    
            res.send(result);
    
            db.close();
        });
    });

};