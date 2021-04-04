import React, {useEffect} from 'react';
import './NoteList.scss';
import {
    useRouteMatch
} from "react-router-dom"; //for match.url

const NoteList =(props) => {
    const {title} = props;
    const match = useRouteMatch();
    useEffect(() => {
       // console.log(match.url); Done for testing; ignore
       getNotes()
    }, [match.url]) //we need to call this useEffect whenever the match.url is changing
    
    const getNotes = async () => {
        
    }
    
    return(
        <div className="note-list">
            <div className="note-list__header">
                <div className="note-list__header-title">
                    <h1> {title} </h1>
                </div>
                <div className="note-list__header-sub-head">
                    <div className="note-count">
                        2 notes
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
