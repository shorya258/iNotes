import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const notesInitial = [
    {
      _id: "6427153af781daeb99ac89ce",
      user: "64157fd4fd3bdfb33b3fff84",
      title: "title 1 ",
      description: "my story is a short one.",
      tag: "personal",
      date: "2023-03-31T17:15:38.057Z",
      __v: 0,
    },
    {
      _id: "6427155ff781daeb99ac89d2",
      user: "64157fd4fd3bdfb33b3fff84",
      title: "title 2 ",
      description: "complete backedn within a week",
      tag: "task",
      date: "2023-03-31T17:16:15.316Z",
      __v: 0,
    },
  ];
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
