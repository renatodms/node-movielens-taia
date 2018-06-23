const mongoClient = require('mongodb').MongoClient,
    fs = require('fs');

const dbUrl = 'mongodb://localhost:27017/',
    movies = JSON.parse(fs.readFileSync(__dirname + '/../data/movies.json', 'utf8')),
    links = JSON.parse(fs.readFileSync(__dirname + '/../data/links.json', 'utf8')),
    ratings = JSON.parse(fs.readFileSync(__dirname + '/../data/ratings.json', 'utf8')),
    tags = JSON.parse(fs.readFileSync(__dirname + '/../data/tags.json', 'utf8'));

mongoClient.connect(dbUrl, (err, db) => {
    if(err) throw err;

    let dbo = db.db('admin');
    dbo.collection('movies').insertMany(movies, (err, result) => {
        if(err) throw err;

        dbo.collection('links').insertMany(links, (err, result) => {
            if(err) throw err;
    
            dbo.collection('ratings').insertMany(ratings, (err, result) => {
                if(err) throw err;
        
                dbo.collection('tags').insertMany(tags, (err, result) => {
                    if(err) throw err;
            
                    db.close();
                });
            });
        });
    });
});