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

exports.getById = (req, res) => {
    const id = req.params.id;

    mongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;
        let dbo = db.db('admin');
        dbo.collection('movies').find({ movieId: id }).toArray((err, result) => {
            if(err) throw err;
    
            res.send(result);
    
            db.close();
        });
    });
};

exports.getMoviesByGenrer = (req, res) => {
    const genrer = req.params.genrer;

    mongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;
    
        let dbo = db.db('admin');
        dbo.collection('movies').find({ genres: { $in: [genrer] } }).toArray((err, result) => {
            if(err) throw err;

            result.map(a => {
                let b = a;
                delete b.genres;
                delete b.title;
                delete b._id;
                return b;
            });
    
            dbo.collection('ratings').find({ $or: result }).sort({ rating: -1 }).limit(5).toArray((err, result) => {
                if(err) throw err;

                const movieIds = result.map(a => {
                    let b = a;
                    return { movieId: b.movieId };
                });
                dbo.collection('movies').find({ $or: movieIds }).toArray((err, result) => {
                    if(err) throw err;

                    res.send(result);

                    db.close();
                });
            });
        });
    });
};

exports.addUser = (req, res) => {
    const name = req.body.name,
        age = req.body.age,
        ocupation = req.body.ocupation;
    let ratings = req.body.ratings,
        favoriteMovies = req.body.favoriteMovies,
        genres = req.body.genres;

    if(!ratings) ratings = [];
    if(!favoriteMovies) favoriteMovies = [];
    if(!genres) genres = [];

    mongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;
        
        let dbo = db.db('admin');
        dbo.collection('users').find({}).sort({ "userId": -1 }).limit(1).toArray((err, result) => {
            if(err) throw err;
            
            dbo.collection('users').insertOne({
                userId: parseInt(result[0].userId)+1,
                name: name,
                age: age,
                ocupation: ocupation,
                favoriteMovies: favoriteMovies,
                genres: genres,
                ratings: ratings
            }, (err, result) => {
                if(err) throw err;

                res.send(result);

                db.close();
            });
        });
    });
};

exports.addRating = (req, res) => {
    const userId = req.body.userId,
        movieId = req.body.movieId,
        rating = req.body.rating;

    mongoClient.connect(dbUrl, (err, db) => {
        if(err) throw err;
        
        let dbo = db.db('admin');
        dbo.collection('ratings').insertOne({
            userId: userId,
            movieId: movieId,
            rating: rating
        }, (err, result) => {
            if(err) throw err;

            res.send(result);

            db.close();
        });
    });
};