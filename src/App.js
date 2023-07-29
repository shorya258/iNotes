import { Route, Switch } from "react-router-dom";
import "./App.css";
import { About } from "./Components/About";
import { Home } from "./Components/Home";
import { Navigation } from "./Components/Navigation";
import NoteState from "./context/notes/NoteState";
const App = () => {
  return (
    <>
      <NoteState>
        <Navigation />
        <div className="container">
          <Switch>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </NoteState>
    </>
  );
};

export default App;
