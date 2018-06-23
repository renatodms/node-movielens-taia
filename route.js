const entity = require('./controller/entityController');

module.exports = (app) => {
    
    app.get('/:entity', entity.getAll);

};