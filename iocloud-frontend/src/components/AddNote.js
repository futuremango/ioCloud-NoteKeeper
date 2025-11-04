import React, { useContext, useState } from "react";
import Context from "../context/notes/noteContext";

const AddNote = () => {
  const yo = useContext(Context);
  const { addNote } = yo;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleClick = (e) => {
    e.preventDefault();
    if (!note.title || !note.description || !note.tag) {
      alert("Please fill all fields before adding a note!");
      return;
    }
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h4>Add a Note</h4>
        <form className="container my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              minLength={4}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              type="text"
              rows={3}
              className="form-control"
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={4}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              minLength={4}
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-secondary"
            onClick={handleClick}
          >
            Add New Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
