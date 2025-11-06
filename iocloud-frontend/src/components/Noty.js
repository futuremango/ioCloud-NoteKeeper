import React, { useContext, useEffect, useRef, useState } from "react";
import Context from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import "../styles/Addnote.css";

const Noty = (props) => {
  const { showAlert } = props;
  const yo = useContext(Context);
  const navigate = useNavigate();
  const { notes, getAllNotes, updateNote } = yo;
  const ref = useRef(null);
  const Closeref = useRef(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    } else {
      getAllNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  //this function is just to prepare the input fields for the actual function: updateNote(check handleClick)
  const updateMyNote = (currentnote) => {
    ref.current.click();
    setNote({
      etitle: currentnote.title || "",
      edescription: currentnote.description || "",
      etag: currentnote.tag || "",
      id: currentnote._id || "",
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!note.etitle || !note.edescription || !note.etag) {
      alert("Please fill all fields before adding a note!");
      return;
    }
    updateNote(note.id, note.etitle, note.edescription, note.etag);
    showAlert("Note updated successfully!", "success");
    Closeref.current.click();
    setNote({ id: "", etitle: "", edescription: "", etag: "" });
    console.log("Updating an existing note: ", note);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className="addnote-container">
      {!localStorage.getItem("token") ? (
        // If not logged in, show this message instead of notes
        <div className="text-center my-5">
          <h3>💌 Login to create your own Dear Diary!</h3>
          <p className="text-muted">
            Write your thoughts, capture your moments, and make them yours.
          </p>
          <button
            className="btn btn-primary mt-3"
            onClick={() => navigate("/auth")}
          >
            Go to Login
          </button>
        </div>
      ) : (
        // If logged in, show notes and AddNote section
        <>
          <AddNote showAlert={props.showAlert} />

          {/* Hidden modal trigger */}
          <button
            type="button"
            className="btn btn-primary d-none"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            ref={ref}
          >
            Launch demo modal
          </button>

          {/* Modal for editing note */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Edit Note
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <div className="modal-body">
                  <form className="container my-3">
                    <div className="mb-3">
                      <label htmlFor="etitle" className="form-label">
                        Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="etitle"
                        name="etitle"
                        value={note.etitle}
                        onChange={onChange}
                        minLength={4}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="edescription" className="form-label">
                        Description
                      </label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="edescription"
                        name="edescription"
                        value={note.edescription}
                        onChange={onChange}
                        rows={5}
                        minLength={4}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="etag" className="form-label">
                        Tag
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="etag"
                        name="etag"
                        value={note.etag}
                        onChange={onChange}
                        minLength={4}
                        required
                      />
                    </div>
                  </form>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                    ref={Closeref}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleClick}
                    className="btn btn-secondary"
                  >
                    Update Note
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Notes section */}
          <div className="notes-section">
          <div className=" concon row my-3">
            <h4>Your Notes</h4>
            <div className="container">
              {notes.length === 0 && "No notes to display here!"}
            </div>
            {notes.map((note) => (
              <NoteItem
                key={note._id}
                showAlert={showAlert}
                updateMyNote={updateMyNote}
                note={note}
              />
            ))}
          </div>
          </div>
        </>
      )}
      </div>
    </>
  );
};

export default Noty;
