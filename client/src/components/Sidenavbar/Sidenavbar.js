import React, { useContext, useState } from 'react';
import './Sidenavbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCannabis, faSearch, faPlus, faStar, faStickyNote, faTrash, faInfo } from '@fortawesome/free-solid-svg-icons';

import { NavLink, useHistory } from 'react-router-dom'
// util functions like getRequest, postRequest will need URLS, hence importing them from apiEndpoints.js
import { BASE_URL, CREATE_NOTE } from './../../utils/apiEndpoints';
import { postRequest } from './../../utils/apiRequests';
import { NotesContext } from './../../context/context';


const Sidenavbar = () => {
    const [error, setError] = useState(null);
    const notesContext = useContext(NotesContext);
    const history = useHistory();

    const handleCreateNote = async () => {
        //calling the util function postRequest
        const response = await postRequest(`${BASE_URL}${CREATE_NOTE}`); //passing in concatenation format
        console.log(response);
        if (response.error){
            setError(response.error);
            return false;
        }
        if(response._id){
            notesContext.notesDispatch({ type: 'createNoteSuccess', payload: response })
            history.push({
                pathname: `/all-notes/${response._id}`,
                note: response // we will update our location.note from here -> useEffect in Note.js
            })
        }
    }


    return (
        <div className="sidenavbar">
            <div className="sidenavbar-top">
                <div className="sidenavbar-top__profile">
                    <div className="profile-icon">
                        C
                    </div>
                    <div className="profile-title">
                        Clevernote
                        <FontAwesomeIcon className="icon" icon={faCannabis} />
                    </div>
                </div>
                <div className="sidenavbar-top__search">
                    <div className="search-block">
                        <FontAwesomeIcon icon ={faSearch} />
                        <input placeholder="Search" />

                    </div>
                </div>
                <div className="sidenavbar-top__create-note">
                    <div className="create-note-btn" onClick={handleCreateNote}>
                    <FontAwesomeIcon className="icon" icon={faPlus} />
                    <div className="title">
                        New Note
                    </div>
                    </div>
                </div>
                <div className="sidenavbar-top__menu-item">
                    <ul>
                        <li>
                            <NavLink to="/all-notes">
                            <FontAwesomeIcon className="icon" icon={faStickyNote} />
                            All Notes
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/important">
                            <FontAwesomeIcon className="icon" icon={faStar} />
                            Important
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/trash">
                            <FontAwesomeIcon className="icon" icon={faTrash} />
                            Trash
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidenavbar-bottom">
                <div className="sidenavbar-bottom__need-help">
                    <FontAwesomeIcon className="icon" icon={faInfo} />
                    Need help?
                </div>
            </div>
        </div>
    )
    }
export default Sidenavbar;
