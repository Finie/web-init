import React from "react";

import image_url from '../../../assets/avatar.png'
import "./viewuser.css";

function Viewuser() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-4">
          <img className="profile-container" alt="profile" src={image_url}/>
        </div>
        <div className="col-md-8">
          <div className="user-info">
            <p>Name: User name</p>
            <p>email: useremail@domain.com</p>
            <p>Phone: +2547265342</p>
            <p>Role: User</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewuser;
