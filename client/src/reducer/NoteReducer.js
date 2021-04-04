//reducer is an immutable function so we can't alter the state
const NoteReducer = (state, action) => {
    //we are not altering the original state since it's immutable, therefore we're using a spread operator and altering a different state here
    let draftNotes = [...state];
    switch (action.type) {
        case 'getAllNotesSuccess':
            return action.payload;
        case 'createNoteSuccess':
            draftNotes.unshift(action.payload);
            return draftNotes;
        case 'updateNoteSuccess':
            // we're finding the updated note index by looping through them
            let index = state.findIndex(item => item._id === action.id); 
            
            //updating the notes by index. using spread operator to get it's existing keys.
            //then we're spreading action.payload to get the updated fields.
            draftNotes[index] = { ...draftNotes[index], ...action.payload };
            return draftNotes;
        case 'archiveNoteSuccess':
            //looping through the notes and returning those which are not archive
            return draftNotes.filter((item) => item._id !== action.id); 
        case 'deleteNoteSuccess':
            //similarly returning those notes which aren't deleted
            return draftNotes.filter((item) => item._id !== action.id);
        default:
            return state;
    }
}

export default NoteReducer;