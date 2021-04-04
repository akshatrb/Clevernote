import React, { useState, useEffect } from 'react';
import './Note.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";

const Note = () => {
    const location = useLocation();
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [isArchive, setIsArchive] = useState(0);
    
    useEffect(() => {
        if(location.note){
            setTitle(location.note.title)
            setDesc(location.note.desc)
            setUpdatedAt(location.note.updatedAt)
            setIsArchive(location.note.archive)
        }
    }, [location.note]) // we will call this useEffect wherever our location.note is changing

    return (
        <div className="note">
            <div className="note__header">
                <div className="note__header-date">
                    Last edited on {updatedAt}
                </div>
                <div className="note__header-action-btn">
                    <div className="action-btn">
                        <FontAwesomeIcon icon={faArchive} />
                    </div>
                </div>
            </div>


            <div className="note__body">
                <div className="note__body-head">
                    <input value={title} placeholder="Title" />
                </div>
                <div className="note__body-content">
                    <textarea value={desc} placeholder="Start writing"/>
                </div>
            </div>
        </div>
    )
}

export default Note;
 