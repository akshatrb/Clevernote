import React, {useContext, useEffect, useState} from 'react';
import './NoteList.scss';
import {
    useRouteMatch,
    useHistory
} from "react-router-dom"; //for match.url
import { BASE_URL, GET_ALL_NOTES, GET_TRASH_NOTES } from './../../utils/apiEndpoints';
import { getRequest } from './../../utils/apiRequests';
import { NotesContext } from './../../context/context';

const NoteList =(props) => {
    const [error, setError] = useState(null)
    const notesContext = useContext(NotesContext);
    const {title} = props;
    const match = useRouteMatch();
    const history = useHistory();
    useEffect(() => {
       // console.log(match.url); Done for testing; ignore
       getNotes()
    }, [match.url]) //we need to call this useEffect whenever the match.url is changing
    
    const getNotes = async () => {
        let endpoint = '';
        if(match.url == '/all-notes'){
            endpoint = GET_ALL_NOTES; 
        } else if (match.url == '/trash'){
            endpoint = GET_TRASH_NOTES; 
        } else {
            return; 
        }

        const response = await getRequest(`${BASE_URL}${endpoint}`)
        if(response.error){
            setError(response.error);
            return false;
        }
        if(response.length > 0){
            notesContext.notesDispatch({ type: 'getAllNotesSuccess', payload: response});
            history.push({
                pathname: `${match.url}/${response[0]._id}`, //concatenating match.url and first note._id
                note: response[0]
            })
        }
    }
    
    return(
        <div className="note-list">
            <div className="note-list__header">
                <div className="note-list__header-title">
                    <h1> {title} </h1>
                </div>
                <div className="note-list__header-sub-head">
                    <div className="note-count">
                        {notesContext.notesState.length} notes
                    </div>
                </div>
            </div>
               
                <div className="note-list__body">

                  <div className="note-card">
                        <div className="note-card__head">
                            <div className="note-card__title"> 
                              The Anatomy of the Human Mind
                            </div>
                            <div className="note-card__desc">
                            The human brain can often be divided into three distinct  </div>

                            </div>
                            <div className="note-card__date">
                               17 Mar 2021
                             </div>
                    </div>

                    <div className="note-card">
                        <div className="note-card__head">
                            <div className="note-card__title"> 
                              The Anatomy of the Human Mind
                            </div>
                            <div className="note-card__desc">
                            The human brain can often be divided into three distinct  </div>

                            </div>
                            <div className="note-card__date">
                               17 Mar 2021
                             </div>

                    </div>
                    
                </div>
        </div>
    )
}

export default NoteList;
