import React, { useContext } from "react";
import Context from "../context/notes/noteContext";
import "../styles/Addnote.css";

const NoteItem = (props) => {
  const yo = useContext(Context);
  const { note, updateMyNote, showAlert } = props;
  const { deleteNote } = yo;

  return (
    <div className="note-item-container col-md-3">
      <div className="cardu my-3">
        <div className="cardu-body">
          <div className="card-header-area d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <div className="card-icons">
            <i
              className="fa-solid fa-trash mx-2 delete-icon"
              onClick={() => {
                deleteNote(note._id);
                showAlert("Note Deleted Successfully.", "success");
              }}
            ></i>
            <i
              className="fa-solid fa-pen-to-square mx-2 edit-icon"
              onClick={() => {
                updateMyNote(note);
              }}
            ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          <p className="note-date">
            {new Date(note.date).toLocaleString("en-PK", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
