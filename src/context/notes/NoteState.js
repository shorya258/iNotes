import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNTdmZDRmZDNiZGZiMzNiM2ZmZjg0In0sImlhdCI6MTY3OTE2NjE2OX0.5rtYir5QGm6TVCmvYSnHR-Q8FKJyJ1aPLnHMVRYf4vo",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  // add a note
  const addNote = async (title, description, tag) => {
    console.log(title + " " + description + " " + tag);
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNTdmZDRmZDNiZGZiMzNiM2ZmZjg0In0sImlhdCI6MTY3OTE2NjE2OX0.5rtYir5QGm6TVCmvYSnHR-Q8FKJyJ1aPLnHMVRYf4vo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const responseJson = await response.json();
    console.log("response", response);
    console.log("responseJson", responseJson);

    // todo: api call
    console.log("Adding new node");
    // const note = {
    //   _id: responseJson._id,
    //   user: responseJson.user,
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "",
    //   __v: 0,
    // };
    setNotes(notes.concat(responseJson));
  };

  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNTdmZDRmZDNiZGZiMzNiM2ZmZjg0In0sImlhdCI6MTY3OTE2NjE2OX0.5rtYir5QGm6TVCmvYSnHR-Q8FKJyJ1aPLnHMVRYf4vo",
      },
    });
    const json = response.json();
    console.log("del" + json);

    // API CALL

    const newNotes = notes.filter((note) => {
      console.log("deleting a note with id " + id);
      return note._id !== id;
    });
    setNotes(newNotes);
    console.log(newNotes);
  };
  // edit a note
  const editNote = async (id, title, description, tag) => {
    // API CALL
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxNTdmZDRmZDNiZGZiMzNiM2ZmZjg0In0sImlhdCI6MTY3OTE2NjE2OX0.5rtYir5QGm6TVCmvYSnHR-Q8FKJyJ1aPLnHMVRYf4vo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json({ title, description, tag });

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
