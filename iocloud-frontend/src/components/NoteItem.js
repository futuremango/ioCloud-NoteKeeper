import React, { useContext } from "react";
import Context from "../context/notes/noteContext";

const NoteItem = (props) => {
  const yo = useContext(Context);
  const { note, updateMyNote } = props;
  const {deleteNote} = yo;
  
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <i className="fa-duotone fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
            <i className="fa-sharp-duotone fa-solid fa-pen-to-square mx-2" onClick={()=>{updateMyNote(note)}}></i>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
