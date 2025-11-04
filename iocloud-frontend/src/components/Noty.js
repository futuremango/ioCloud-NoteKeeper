import React, { useContext } from "react";
import Context from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from './AddNote';


const Noty = () => {
  const yo = useContext(Context);
  const {notes} = yo;
  return (
    <>
    <AddNote/>
    <div className="row my-3">
      <h4>~ Your Notes ~</h4>
      {notes.map((note) => {
        return <NoteItem key= {note._id} note={note} />
      })}
    </div>
    </>
  );
};

export default Noty;
