import React from 'react';
import './Note.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive } from '@fortawesome/free-solid-svg-icons';


const Note = () => {
    return (
        <div className="note">
            <div className="note__header">
                <div className="note__header-date">
                    Last edited on Mar 18, 2021
                </div>
                <div className="note__header-action-btn">
                    <div className="action-btn">
                        <FontAwesomeIcon icon={faArchive} />
                    </div>
                </div>
            </div>


            <div className="note__body">
                <div className="note__body-head">
                    <input placeholder="Title" />
                </div>
                <div className="note__body-content">
                    <textarea placeholder="Start writing"/>
                </div>
            </div>
        </div>
    )
}

export default Note;
 