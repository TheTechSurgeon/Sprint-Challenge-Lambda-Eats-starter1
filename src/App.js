import React from "react";
import {Route,Link} from 'react-router-dom';
import Form from "./components/Form"


const App = () => {
  return (
    <div>
      <div>
    <Route exact path= '/'/>
    <Route path='/pizza'
    component={Form}/>
    </div>
    
    <div>
    <Link exact to ='/pizza'>Pizza</Link>
    </div>
    </div>
  );
};
export default App;