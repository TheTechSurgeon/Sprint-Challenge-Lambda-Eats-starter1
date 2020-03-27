import React from "react";
import {Route,Link,Switch} from 'react-router-dom';
import Form from "./components/Form"


const App = () => {
  return (
    <div>
      <nav className="navbar">
          <Link to="/">
            <button name = 'homebutton'>Home</button>
            </Link>
          <br/>
          <Link to="/form"> 
          <button name = 'pizza'>Pizza</button>
          </Link>
      </nav>
      <div className="App">
        <Switch>
          <Route exact path="/"  />
          <Route path="/form" component={Form} />
        </Switch>
      </div>
    </div>
  );
};
export default App;