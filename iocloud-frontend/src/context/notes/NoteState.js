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
    "_id": "69089ba352a6d4d581fd2c2a",
    "user": "6904f79805090c0a952e6f00",
    "title": "abssdls",
    "description": "ndkjwqjnjkwdnksssm kmsakmdk wlkeoppiepslmsdnkslNDLD2093 DNKSMDKLDM",
    "tag": "Task",
    "date": "2025-11-03T12:10:11.380Z",
    "__v": 0
  },
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
    "_id": "69089ba352a6d4d581fd2c2a",
    "user": "6904f79805090c0a952e6f00",
    "title": "abssdls",
    "description": "ndkjwqjnjkwdnksssm kmsakmdk wlkeoppiepslmsdnkslNDLD2093 DNKSMDKLDM",
    "tag": "Task",
    "date": "2025-11-03T12:10:11.380Z",
    "__v": 0
  },
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
    "_id": "69089ba352a6d4d581fd2c2a",
    "user": "6904f79805090c0a952e6f00",
    "title": "abssdls",
    "description": "ndkjwqjnjkwdnksssm kmsakmdk wlkeoppiepslmsdnkslNDLD2093 DNKSMDKLDM",
    "tag": "Task",
    "date": "2025-11-03T12:10:11.380Z",
    "__v": 0
  }
]
const [notes, setNotes] = useState(initial_notes)
  
  return (
    <NoteContext.Provider value={{notes, setNotes}}>{props.children}</NoteContext.Provider>
  );
};

export default NoteState;

//this is NoteState.js (which is the provider of content) => noteContext.js (which is the collector and importer)
//this works like props but this is much better because useContext does not need 
// to be passed down in order to be used by a component. 
//Just import useContext + useState(duo) from react and the importer file (noteContext) 
//so that u can use the stuff present in NoteState.
