import Landing from "./components/landing/Landing";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import EmailVerification from "./components/routings/EmailVerification";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from "./components/home/Home";
import PrivateRoute from "./components/HOC/PrivateRoute";
import RestrictedRoute from "./components/HOC/RestrictedRoute";
import Sell from "./components/sell/Sell";
import ProductDetails from "./components/Product/ProductDetails";
import AdminLogin from "./components/admin/AdminLogin";
import AdminRoute from "./components/HOC/AdminRoute";
//import AdminDashboard from "./components/admin/AdminDashboard";
import ProductsVerification from "./components/admin/ProductsVerification";
import AdminProductDetails from "./components/admin/ProductDetails";
import Reports from "./components/admin/Reports";
import ReportDetails from "./components/admin/ReportDetails";
import { Redirect } from "react-router";
import './components/utils/Utils.css'
import ChangePassword from "./components/changePassword/ChangePassword";
import Ads from "./components/Profile/Ads";
import Feedback from "./components/Feedback/Feedback";

// import Test from "./components/Test";


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
              {/* <Test/> */}
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
            <Route exact path = '/products/:id'>
              <PrivateRoute>
                <ProductDetails/>
              </PrivateRoute>
            </Route>
            <Route exact path = '/sell'>
              <PrivateRoute>
                <Sell/>
              </PrivateRoute>
            </Route>
            <Route exact path = '/change_password'>
              <ChangePassword/>
            </Route>
            <Route exact path = '/my_ads'>
              <PrivateRoute>
                <Ads/>
              </PrivateRoute>
            </Route>
            <Route exact path = '/feedback'>
              <PrivateRoute>
                <Feedback/>
              </PrivateRoute>
            </Route>
            <Route exact path ='/admin/login'>
              <RestrictedRoute>
                  <AdminLogin/>
              </RestrictedRoute>
            </Route>
            <Route exact path ='/admin/dashboard'>
              <Redirect to ="/admin/products_verification"/>
            </Route>
            <Route exact path ='/admin/products_verification'>
              <AdminRoute>
                <ProductsVerification/>
              </AdminRoute>
            </Route>
            <Route exact path ='/admin/products_verification/:id'>
              <AdminRoute>
                <AdminProductDetails/>
              </AdminRoute>
            </Route>
            <Route exact path ='/admin/reports'>
              <AdminRoute>
                <Reports/>
              </AdminRoute>
            </Route>
            <Route exact path ='/admin/reports/:id'>
              <AdminRoute>
                <ReportDetails/>
              </AdminRoute>
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
