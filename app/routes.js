const controller = require('./controller');
var path = require("path");

module.exports = (app) => {
    
    
    app.post('/api/note', controller.createNewNote);
    app.get('/api/notes/:type', controller.getAllNotes);
    app.put('/api/note/:id', controller.updateNoteById);
    app.delete('/api/note/:id', controller.deleteNote);
    app.use('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/../client/build/index.html'));
    });
};

