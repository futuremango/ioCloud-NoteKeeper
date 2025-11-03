import React, { useContext } from "react";
import Context from "../context/notes/noteContext";
import NoteItem from "../components/NoteItem";
const Noty = () => {
  const yo = useContext(Context);
  const { notes, setNotes } = yo;
  return (
    <div className="row my-3">
      <h4>~ Your Notes ~</h4>
      {notes.map((note) => {
        return <NoteItem note={note} />
      })}
    </div>
  );
};

export default Noty;
