import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {

 const initial_notes = [
  {
    "_id": "6906149817802a1419538166",
    "user": "6904f79805090c0a952e6f00",
    "title": "Monday updated",
    "description": "Complete React Course Update Done",
    "tag": "Task",
    "date": "2025-11-01T14:09:28.172Z",
    "__v": 0
  },
  {
    "_id": "69089ba35dmmq2a6dkeke4d581fd2c2a",
    "user": "6904f7980ekeke5090c0a952e6f00",
    "title": "abssdls",
    "description": "ndkjwqjnjkwdnksssm kmsakmdk wlkeoppiepslmsdnkslNDLD2093 DNKSMDKLDM",
    "tag": "Task",
    "date": "2025-11-03T12:10:11.380Z",
    "__v": 0
  },
    {
    "_id": "690614981718ldfm02a1419538166",
    "user": "6904f79805090c0a952e6f00",
    "title": "Monday updated",
    "description": "Complete React Course Update Done",
    "tag": "Task",
    "date": "2025-11-01T14:09:28.172Z",
    "__v": 0
  },
  {
    "_id": "69089ba352alae64d4d581fd2c2a",
    "user": "6904f79805090c0a952e6f00",
    "title": "abssdls",
    "description": "ndkjwqjnjkwdnksssm kmsakmdk wlkeoppiepslmsdnkslNDLD2093 DNKSMDKLDM",
    "tag": "Task",
    "date": "2025-11-03T12:10:11.380Z",
    "__v": 0
  },
    {
    "_id": "69061498178la0222a1419538166",
    "user": "6904f79805090c0a952e6f00",
    "title": "Monday updated",
    "description": "Complete React Course Update Done",
    "tag": "Task",
    "date": "2025-11-01T14:09:28.172Z",
    "__v": 0
  },
  {
    "_id": "69089ba352a65msd4d581fd2c2a",
    "user": "6904f79805090c0a952e6f00",
    "title": "abssdls",
    "description": "ndkjwqjnjkwdnksssm kmsakmdk wlkeoppiepslmsdnkslNDLD2093 DNKSMDKLDM",
    "tag": "Task",
    "date": "2025-11-03T12:10:11.380Z",
    "__v": 0
  }
]
const [notes, setNotes] = useState(initial_notes);

const addNote=(title, description, tag)=>{
  console.log("adding note: ");
   const note= {
    "_id": "69089ba3kmlwkmd5ksw2a65msd49d581fd2c2a",
    "user": "6904f798kdmclkm05090c00a9952e6f00",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2025-11-03T12:10:11.380Z",
    "__v": 0
  };
   setNotes(notes.concat(note))
}
const deleteNote=(id)=>{
  console.log("Deleting the note with id: "+ id);
  const newNote = notes.filter((note)=> {return note._id!==id});
  setNotes(newNote);
}
const updateNote=(id, title, description, tag)=>{
  for (let i = 0; i < notes.length; i++) {
    const element = notes[i];
    if(element._id===id) {
    element.title = title;
    element.description = description;
    element.tag = tag;
    }
  }
}

  
  return (
    <NoteContext.Provider value={{notes, addNote, deleteNote, updateNote}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;

//this is NoteState.js (which is the provider of content) => noteContext.js (which is the collector and importer)
//this works like props but this is much better because useContext does not need 
// to be passed down in order to be used by a component. 
//Just import useContext + useState(duo) from react and the importer file (noteContext) 
//so that u can use the stuff present in NoteState.
