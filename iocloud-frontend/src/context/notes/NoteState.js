import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const { showAlert } = props;
  const initial_notes = [];
  const [notes, setNotes] = useState(initial_notes);
  const host = "http://localhost:5000";

  const getAllNotes = async () => {
    //saray backend waly functions ab frontend m bhi banao
    const response = await fetch(`${host}/api/notes/fetchAllnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  const addNote = async (title, description, tag) => {
    console.log("adding note: ");
    const response = await fetch(`${host}/api/notes/addNote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    console.log("Note Added: ", note);
    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (!confirmDelete) return;

    const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log("Deleted note response: ", json);

    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    showAlert("Note Deleted Successfully.", "success");
  };

  const updateNote = async (id, title, description, tag) => {
    console.log("Editing note: ");
    const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log("Edited note response: ", json);
    const edited = notes.map((note) => {
      if (note._id === id) {
        return { ...note, title, description, tag };
      }
      return note;
    });
    setNotes(edited);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, updateNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

//this is NoteState.js (which is the provider of content) => noteContext.js (which is the collector and importer)
//this works like props but this is much better because useContext does not need
// to be passed down in order to be used by a component.
//Just import useContext + useState(duo) from react and the importer file (noteContext)
//so that u can use the stuff present in NoteState.
