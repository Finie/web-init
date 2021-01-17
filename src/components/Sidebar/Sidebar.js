import React from "react";
import {
  FaUsers,
  RiDashboardFill,
  FiEdit,
  IoPersonAdd,
  IoPersonRemove,
} from "react-icons/all";
import { Link } from "react-router-dom";

import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-menu">
        <ul>
          <div className="sidebar-menu-logo">
            <RiDashboardFill className="sidebar-icon" /> Website Name
          </div>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <li className="sidebar-menu-item">
              <FaUsers className="sidebar-icon" /> <p>View User</p>
            </li>
          </Link>

          <Link style={{ textDecoration: "none" }} to={"/edit-user"}>
            <li className="sidebar-menu-item">
              <FiEdit className="sidebar-icon" /> <p>Edit User</p>
            </li>
          </Link>

          <Link style={{ textDecoration: "none" }} to={"/create-user"}>
            <li className="sidebar-menu-item">
              <IoPersonAdd className="sidebar-icon" /> <p>Create User</p>
            </li>
          </Link>
          <div className="sidebar-menu-signout">sign out</div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
