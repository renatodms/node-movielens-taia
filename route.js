const entity = require('./controller/entityController');

module.exports = (app) => {
    
    app.get('/:entity', entity.getAll);
    app.get('/:entity/:size', entity.getAllSized);
    app.post('/users', entity.addUser);

};