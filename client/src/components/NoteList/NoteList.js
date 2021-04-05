import React, { useContext, useEffect, useState } from 'react';
import './NoteList.scss';
import {
    useRouteMatch,
    useHistory,
    NavLink //for click functionality ie. on clicking note in NoteList, it should appear in the noteTextArea
} from "react-router-dom"; //for match.url
import { BASE_URL, GET_ALL_NOTES, GET_TRASH_NOTES } from './../../utils/apiEndpoints';
import { getRequest } from './../../utils/apiRequests';
import { NotesContext } from './../../context/context';

const NoteList = (props) => {
    const [error, setError] = useState(null)
    const notesContext = useContext(NotesContext);
    const { title } = props;
    const match = useRouteMatch();
    const history = useHistory();
    useEffect(() => {
        // console.log(match.url); Done for testing; ignore
        getNotes()
    }, [match.url]) //we need to call this useEffect whenever the match.url is changing

    const getNotes = async () => {
        let endpoint = '';
        if (match.url == '/all-notes') {
            endpoint = GET_ALL_NOTES;
        } else if (match.url == '/trash') {
            endpoint = GET_TRASH_NOTES;
        } else {
            return;
        }

        const response = await getRequest(`${BASE_URL}${endpoint}`)
        if (response.error) {
            setError(response.error);
            return false;
        }
        notesContext.notesDispatch({ type: 'getAllNotesSuccess', payload: response });
        if (response.length > 0) {
            history.push({
                pathname: `${match.url}/${response[0]._id}`, //concatenating match.url and first note._id
                note: response[0]
            })
        }
    }

    return (
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
                {
                    notesContext.notesState.length > 0 ? notesContext.notesState.map((note) => (
                        <NavLink key={note._id}className="note-card" to={
                            {
                                pathname: `${match.url}/${note._id}`,
                                note
                            }
                        }>
                            <div className="note-card__head">
                                <div className="note-card__title">
                                    {note.title}
                                </div>

                                <div className="note-card__desc">
                                    {note.desc}
                                </div>

                            </div>
                            <div className="note-card__date">
                                {note.updatedAt}
                             </div>
                        </NavLink> //for click functionality we're using NavLink
                    )
                    ) : <div className="empty-state">No data found</div>
                }



            </div>
        </div>
    )
}

export default NoteList;
