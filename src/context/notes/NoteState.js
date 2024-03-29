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
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    console.log("fetch req", json);
    setNotes(json);
  };
  // add a note
  const addNote = async (title, description, tag) => {
    console.log(title + " " + description + " " + tag);
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const responseJson = await response.json();
    // console.log("response", response);
    // console.log("responseJson", responseJson);

    // todo: api call
    console.log("Adding new node");
    setNotes(notes.concat(responseJson));
  };

  // delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
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
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    // const json = response.json({ title, description, tag });
    // in react, we cannot directly change the state without reloading, hence new var for edited notes
    let newNotes = JSON.parse(JSON.stringify(notes));
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
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
