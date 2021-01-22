import React, { useState, useEffect } from "react";
import "./App.css";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Viewuser from "./pages/other/view-users/ViewUser";
import Createuser from "./pages/other/create-user/Createuser";
import Edituser from "./pages/other/edit-user/Edituser";
import AccessDenied from "./pages/other/AccessPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState({});
  const [amnin, setAmnin] = useState('')
  let createUser = <div>is not admin</div>;

 

  useEffect(() => {
    // Your code here
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    setUser({ token: token, isAdmin: isAdmin });
  }, []);


  
  return (
    <div className="App">
      <Router>
 
        {user.token ? (
          <div className="grid-container">
            <Sidebar user={user} className="grid-sidebar" />
            <div class="header">
              <p>Header section</p>
            </div>
            <Switch>
              <div class="content">
              <Route exact path="/" component={Viewuser} />
                <Route exact path="/dashboard" component={Viewuser} />
               {user.isAdmin === "admin"  ? <Route exact path="/create-user" component={Createuser} /> : <Route exact path="/create-user" component={AccessDenied} /> }
                <Route exact path="/edit-user" component={Edituser} />
              </div>
            </Switch>
          </div>
        ) : (
          <Switch>
            <div class="content">
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
            </div>
          </Switch>
        )}



      </Router>
    </div>
  );
}

export default App;
