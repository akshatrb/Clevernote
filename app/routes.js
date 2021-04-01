const controller = require('./controller');

module.exports = (app) => {
    app.post('/api/note', controller.createNewNote);
    app.get('/api/notes/:type', controller.getAllNotes);
    app.put('/api/notes/:id', controller.updateNoteById);
    app.delete('/api/note/:id', controller.deleteNote);
}