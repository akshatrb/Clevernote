import React, { useState, useEffect, useContext } from 'react';
import './Note.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faBackward, faTrash } from '@fortawesome/free-solid-svg-icons';
import { 
    useLocation,
    useParams,
    useHistory
 } from "react-router-dom";
import { deleteRequest, putRequest } from './../../utils/apiRequests';
import { BASE_URL, DELETE_NOTE, UPDATE_NOTE } from './../../utils/apiEndpoints';
import { NotesContext } from './../../context/context';
import { noteFormatDate } from './../../utils/helpers';

const Note = () => {
    const location = useLocation();
    const params = useParams();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const notesContext = useContext(NotesContext);
    const [updatedAt, setUpdatedAt] = useState('');
    const [isArchive, setIsArchive] = useState(0);
    const [error, setError] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (location.note) {
            setTitle(location.note.title)
            setDesc(location.note.desc)
            setUpdatedAt(location.note.updatedAt)
            setIsArchive(location.note.archive)
        }
    }, [location.note]) // we will call this useEffect wherever our location.note is changing

    useEffect(() => {
        if (notesContext.notesState.length > 0) {
            const [selectednote] = notesContext.notesState.filter((e) => e._id === params.id);
            if (selectednote) {
                setTitle(selectednote.title)
                setDesc(selectednote.desc)
                setUpdatedAt(selectednote.updatedAt)
                setIsArchive(selectednote.archive)
            }
        }
    }, [notesContext.notesState])


    const handleTitleChange = (e) => {
        setTitle(e.target.value)
    }

    const handleDescChange = (e) => {
        setDesc(e.target.value)
    }

    const handleUpdateNote = async (key) => {
        let query = {};
        if (key == 'title') {
            query['title'] = title;
        } else if (key == 'desc') {
            query['desc'] = desc;
        }
        
        //Now our PUT request
        const response = await putRequest(`${BASE_URL}${UPDATE_NOTE}${params.id}`, query);
        if (response.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'updateNoteSuccess', payload: response, id: params.id })
    }

    const resetState =() => {
        setTitle('');
        setDesc('');
        setUpdatedAt('');
        setIsArchive(0);
        setError(null);
    }

    const handleUnArchiveNote = async () => {
        let query ={
            archive: 0
        }
        const response = await putRequest(`${BASE_URL}${UPDATE_NOTE}${params.id}`, query);
        if(response.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({type: 'archiveNoteSuccess', id: params.id})
        resetState();
        history.push(`/trash`)
    }

    const handleArchiveNote = async () => {
        let query = {
            archive: 1
        };
        const response = await putRequest(`${BASE_URL}${UPDATE_NOTE}${params.id}`, query);
        if(response.error){ //error hnadling
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({type: 'archiveNoteSuccess', id: params.id})
            //if update is succesfull, we will dispatch archiveNoteSuccess with the note id
        resetState(); //since the note is deleted, we need to reset all the states
        history.push(`/all-notes`) //since the note is deleted so it is no longer available in all-notes therefore we need to do history.push
    }

    const handleDeleteNote = async () => {
        const response = await deleteRequest(`${BASE_URL}${DELETE_NOTE}${params.id}`);
        if(response.error){
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'deleteNoteSuccess', id: response})
        resetState();
        history.push('/trash');
    }

    return (
        <div className="note">
            <div className="note__header">
                <div className="note__header-date">
                    Last edited on {noteFormatDate(updatedAt)}
                </div>
                <div className="note__header-action-btn">
                    {!isArchive ? (
                        <div className="action-btn" onClick={handleArchiveNote}>
                            <FontAwesomeIcon icon={faArchive} />
                        </div>
                    ) : (
                        <>
                        <div className="action-btn">
                            <FontAwesomeIcon icon={faBackward} onClick={handleUnArchiveNote} />
                        </div>
                        <div className="action-btn">
                            <FontAwesomeIcon icon={faTrash} onClick={handleDeleteNote}/>
                        </div>
                        </>
                    )}
                    
                    
                </div>
            </div>

                        
            <div className="note__body">
                <div className="note__body-head">
                    <input value={title} placeholder="Title" onChange={handleTitleChange} onBlur={() => handleUpdateNote('title')} />
                </div>
                <div className="note__body-content">
                    <textarea value={desc} placeholder="Start writing" onChange={handleDescChange} onBlur={() => handleUpdateNote('desc')} />
                </div>
            </div>
        </div>
    )
}
//onBlur used above is to update the text that we type in the DB
export default Note;
 