import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import RideDetails from './Components/RideDetails/RideDetails';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header/>
        <Switch>
            <Route path="/home">
                <Home/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <PrivateRoute path="/rideDetails/:id">
              <RideDetails></RideDetails>
            </PrivateRoute>
            <Route exact path="/">
              <Home/>
            </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
