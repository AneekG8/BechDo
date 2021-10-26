import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import EmailVerification from "./components/routings/EmailVerification";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from "./components/home/Home";
import PrivateRoute from "./components/HOC/PrivateRoute";
import RestrictedRoute from "./components/HOC/RestrictedRoute";



function App() {
  return (
    <Router>
      <div className="App">
        <div className="routes">
          <Switch>
            <Route exact path = '/'>
              <RestrictedRoute>
                <Landing/>
              </RestrictedRoute>
            </Route>
            <Route exact path ='/login'>
              <RestrictedRoute>
                  <Login/>
              </RestrictedRoute>
            </Route>
            <Route exact path ='/signup'>
              <RestrictedRoute>
                  <Signup/>
              </RestrictedRoute>
            </Route>
            <Route exact path = '/home'>
              <PrivateRoute>
                <Home/>
              </PrivateRoute>
            </Route>
            <Route exact path ='/email_verification'>
              <EmailVerification/>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
