import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const s1 = {
    name: "Shorya",
    class: "5 A",
  };
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
      setState({ name: "Shoryayayayayayaya", class: "X  B" });
    }, 1000);
  };
  return (
    <NoteContext.Provider value={{ state, update }}>
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
