import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";

export const About = () => {
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      This is About {a.state.name} and she is in class {a.state.class}{" "}
    </div>
  );
};
