import './App.css';
import { useEffect } from 'react';
import {Switch,Route} from 'react-router-dom';
import Users from './Components/Users';


function App() {
  useEffect(()=>{
    document.body.style.overflowX="hidden";
  },[])
  return (
    <div className="App">
     <Switch>
      <Route exact path="/" component={Users}/>
     </Switch>
    </div>
  );
}

export default App;
