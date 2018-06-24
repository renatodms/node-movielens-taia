const mongoClient = require('mongodb').MongoClient,
    fs = require('fs'),
    randomName = require('node-random-name');

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

                    let users = [],
                        userRatings = [];
                    for(let i=0; i< ratings.length; ++i){
                        if(ratings[i+1] != undefined && ratings[i+1].userId == ratings[i].userId){
                            userRatings.push({ movieId: ratings[i].movieId, rating: ratings[i].rating });
                        } else {
                            users.push({
                                userId: ratings[i].userId,
                                name: randomName(),
                                ratings: userRatings
                            });
                            userRatings = [];
                        }
                    }
                    dbo.collection('users').insertMany(users, (err, result) => {
                        if(err) throw err;

                        db.close();
                    });
                });
            });
        });
    });
});