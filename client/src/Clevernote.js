import React, { useReducer } from 'react';
import './Clevernote.scss';
import Home from './components/Home/Home';
import Sidenavbar from './components/Sidenavbar/Sidenavbar';
import NoteList from './components/NoteList/NoteList';
import Note from './components/Note/Note';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NoteReducer from './reducer/NoteReducer';
import { NotesContext } from './context/context';

const initialState = [];

//We've changed the orientation on line 24 where <Note /> !! If something breaks, revert from Master branch
//Wrapping our div with Router

function Clevernote() {
  const [notes, notesDispatch] = useReducer(NoteReducer, initialState); //react hook useReducer, passing NoteReducer and initial state into it.

  //wrapping everything with notesContext.provider inside router

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home title="Home" />
        </Route>

        <NotesContext.Provider value={{ notesState: notes, notesDispatch }}>
          <div className="Clevernote">
            <Sidenavbar />

            <Route path="/all-notes">
              <NoteList title="All Notes" />
              <Route path="/all-notes/:id">
                <Note />
              </Route>
            </Route>
            <Route path="/trash">
              <NoteList title="Trash" />
              <Route path="/trash/:id">
                <Note />
              </Route>
            </Route>

          </div>
        </NotesContext.Provider>
      </Switch>
    </Router>
  );
}

export default Clevernote;
