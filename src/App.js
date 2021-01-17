import logo from "./logo.svg";
import "./App.css";
import Register from "./pages/auth/register/Register";
import Login from "./pages/auth/login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Viewuser from './pages/other/view-users/ViewUser'
import Createuser from "./pages/other/create-user/Createuser";
import Edituser from './pages/other/edit-user/Edituser'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="grid-container">
          <Sidebar className="grid-sidebar" />
          <div class="header">
            <p>Header section</p>
          </div>
          <Switch>
            <div class="content">
            <Route  exact path='/' component={Viewuser} />
            <Route exact path="/create-user" component={Createuser}/>
            <Route exact path="/edit-user" component={Edituser}/>
            </div>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
