import React, { useState, useEffect } from "react";
import axios from "axios";
import useLoader from "../../../hooks/useLoader";

import image_url from "../../../assets/avatar.png";
import "./viewuser.css";

function Viewuser() {
  const [CurrentUser, setCurrentUser] = useState(null);
  const [Loading, isLoading, hideLoading] = useLoader();
  const [errorMessage, seterrorMessage] = useState('')
  const [imageUrl, setimageUrl] = useState(image_url)  
  const [user, setUser] = useState({});

  const getCurrentUser = () =>{

    
  }

  useEffect(() => {
    isLoading()
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    setUser({ token: token, isAdmin: isAdmin });

    axios
      .get("https://koodiweb-service-apis.herokuapp.com/api/users/me", {
        headers: {
          "x-auth-token": token },
      })
      .then((response) => {
        setCurrentUser(response.data);
        setimageUrl("https://koodiweb-service-apis.herokuapp.com/"+response.data.data.profile)
        hideLoading();
      })
      .catch((error) => {
        seterrorMessage(error.response)
        hideLoading();
      });


  }, []);

  return (
    <div className="container-fluid">
      {Loading}
      <div className="row">
      <div className="error-message">{errorMessage && `Error: ${errorMessage}`}</div>
        <div className="col-md-4">
          <img className="profile-container" alt="profile" src={imageUrl} />
        </div>
        <div className="col-md-8">
          <div className="user-info">
            <p>{`Name: ${CurrentUser && CurrentUser.data.userName}`}</p>
            <p>{`Email: ${CurrentUser && CurrentUser.data.userEmail}`}</p>
            <p>{`Phone: ${CurrentUser && CurrentUser.data.userPhone}`}</p>
            <p>{`Role: ${
              CurrentUser && CurrentUser.data.isAdmin ? "Admin" : "User"
            }`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Viewuser;
