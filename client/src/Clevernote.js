import React from 'react';
import './Clevernote.scss';
import Sidenavbar from './components/Sidenavbar/Sidenavbar';
import NoteList from './components/NoteList/NoteList';
import Note from './components/Note/Note';
import{
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
 
//We've changed the orientation on line 24 where <Note /> !! If something breaks, revert from Master branch
//Wrapping our div with Router
function Clevernote() {
  return (
    <Router> 
    <div className="Clevernote">
      <Sidenavbar />
      

      <Switch>

        
        <Route path="/all-notes">
        <NoteList title="All Notes" />
          <Route path="/all-notes/:id">
          <Note />
          </Route>
        </Route>

        <Route path="/trash">
        <NoteList title="Trash"/>
          <Route path="/trash/:id">
          <Note /> 
          
          </Route>
        </Route>

      </Switch>
      
      
    </div>
    </Router>
  );
}

export default Clevernote;
