import { Route, Switch } from "react-router-dom";
import "./App.css";
import { About } from "./Components/About";
import { Home } from "./Components/Home";
import { Navigation } from "./Components/Navigation";
import { Alert } from "./Components/Alert";
import NoteState from "./context/notes/NoteState";
import Login from "./Components/Login";
import Signuppage from "./Components/Signuppage";
import { useState } from "react";

const App = () => {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };
  return (
    <>
      <NoteState>
        <Navigation />
        <Alert alert={alert} />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home showAlert={showAlert} />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/login">
              <Login showAlert={showAlert} />
            </Route>
            <Route exact path="/signup">
              <Signuppage showAlert={showAlert} />
            </Route>
          </Switch>
        </div>
      </NoteState>
    </>
  );
};

export default App;
