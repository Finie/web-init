import React, { useState, useEffect } from "react";
import {
  FaUsers,
  RiDashboardFill,
  FiEdit,
  IoPersonAdd,
  IoPersonRemove,
  FaSignOutAlt
} from "react-icons/all";
import { Link, useHistory } from "react-router-dom";

import "./sidebar.css";

function Sidebar() {

  const [user, setUser] = useState({});
  let history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    setUser({ token: token, isAdmin: isAdmin });
  }, []);
  

  const logout = () =>{
    history.push('/')
    localStorage.clear();
    window.location.reload(false);
  }

  console.log("user details: ", user.isAdmin);

  return (
    <div className="sidebar-container">
      <div className="sidebar-menu">
        <ul>
          <div className="sidebar-menu-logo">
            <RiDashboardFill className="sidebar-icon" /> Website Name
          </div>
          <Link style={{ textDecoration: "none" }} to={"/dashboard"}>
            <li className="sidebar-menu-item">
              <FaUsers className="sidebar-icon" /> <p>View User</p>
            </li>
          </Link>

          <Link style={{ textDecoration: "none" }} to={"/edit-user"}>
            <li className="sidebar-menu-item">
              <FiEdit className="sidebar-icon" /> <p>Edit User</p>
            </li>
          </Link>

         {user.isAdmin==="admin" ? <Link style={{ textDecoration: "none" }} to={"/create-user"}>
            <li className="sidebar-menu-item">
              <IoPersonAdd className="sidebar-icon" /> <p>Create User</p>
            </li>
          </Link> : <div></div>}
          <div className="sidebar-menu-signout" onClick={logout}><FaSignOutAlt style={{marginTop:6,marginRight:6}}/> sign out</div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
