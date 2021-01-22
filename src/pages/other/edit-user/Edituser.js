import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { IoMail, FaUserEdit, FaPhoneAlt } from "react-icons/all";

import { useHistory } from "react-router-dom";

import axios from "axios";
import image_url from "../../../assets/avatar.png";
import "./edituser.css";
import useLoader from "../../../hooks/useLoader";

function Edituser() {
  let history = useHistory();
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState(image_url);
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [userId, setuserId] = useState("");
  const [user, setUser] = useState({});
  const [Loading, isLoading, hideLoading] = useLoader();
  const [errorMessage, seterrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    isLoading();
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    setUser({ token: token, isAdmin: isAdmin });

    axios
      .get("https://koodiweb-service-apis.herokuapp.com/api/users/")
      .then((response) => {
        setUsers(response.data);
        hideLoading();
      })
      .catch((error) => {
        seterrorMessage(error.response);
        hideLoading();
      });
  }, []);

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handlefile = (e) => {
    setFile(e.target.files[0]);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    isLoading();
    if (confirm !== password) return console.log("password dont match");

    const fd = new FormData();
    fd.append("useremail", email);
    fd.append("username", username);
    fd.append("phone", phone);
    fd.append("userId", userId);

    fd.append("file_name", file, file.name);

    axios
      .put("https://koodiweb-service-apis.herokuapp.com/api/users/", fd, {
        headers: { "x-auth-token": user.token },
      })
      .then((response) => {
        console.log(response);
        hideLoading();
        window.location.reload(false);
      })
      .catch((error) => {
        seterrorMessage(error.response.data.description);
        hideLoading();
      });
  };

  const handleClick = (e, userinfo) => {
    setUsername(userinfo.userName);
    setPhone(userinfo.userPhone);
    setEmail(userinfo.userEmail);
    setuserId(userinfo._id);
    setImageUrl(
      "https://koodiweb-service-apis.herokuapp.com/" + userinfo.profile
    );
  };

  const handleDelete = (e, userinfo) => {
    e.preventDefault();
    isLoading();
    const fd = new FormData();
    fd.set("userId", userinfo._id);

    const configs = { headers: { "x-auth-token": user.token } };

    axios
      .delete(
        "https://koodiweb-service-apis.herokuapp.com/api/users/" + userinfo._id,
        configs
      )
      .then((response) => {
        hideLoading();
        window.location.reload(false);
      })
      .catch((error) => {
        seterrorMessage(
          error.response.data.description +
            " " +
            error.response.data.error.message
        );
        hideLoading();
      });
  };

  return (
    <div className="edit-container">
      {Loading}

      <Form onSubmit={handleUpdate}>
        <div className="edit-fields">
          <div className="image-edit">
            {selectedImage ? (
              <img
                src={selectedImage}
                className="avatar-image"
                alt="profile-image"
              />
            ) : (
              <img
                src={imageUrl}
                className="avatar-image"
                alt="profile-image"
              />
            )}
            <Form.Group className="form-file">
              <input required onChange={handlefile} type="file" />
            </Form.Group>
            <div className="error-message">
              {errorMessage && `Error: ${errorMessage}`}
            </div>
          </div>

          <div className="text-edits">
            <Form.Group controlId="formGroupEmail">
              <Form.Label className="label">
                <FaUserEdit style={{ marginRight: 6, marginTop: 4 }} /> Update
                Username
              </Form.Label>
              <Form.Control
                type="text"
                required
                onChange={handleUsername}
                placeholder="Update Username"
                value={username}
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label className="label">
                <IoMail style={{ marginRight: 6, marginTop: 4 }} /> Update Email
                address
              </Form.Label>
              <Form.Control
                type="email"
                required
                onChange={handleEmail}
                placeholder="Update Email Address"
                value={email}
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label className="label">
                <FaPhoneAlt style={{ marginRight: 6, marginTop: 4 }} /> Update
                Phone
              </Form.Label>
              <Form.Control
                type="tel"
                required
                onChange={handlePhone}
                placeholder="Update Phone"
                value={phone}
              />
            </Form.Group>

            <div className="submit-button">
              <Button variant="primary" type="submit">
                Update profile
              </Button>
            </div>
          </div>
        </div>
      </Form>

      {user.isAdmin === "admin" ? (
        <div className="table">
          <table>
            <thead>
              <tr>
                <td>No.</td>
                <th>UserId</th>
                <th>Username</th>
                <th>Email Address</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userinfo, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{userinfo._id}</td>
                    <td>{userinfo.userName}</td>
                    <td>{userinfo.userEmail}</td>
                    <td>{userinfo.userPhone}</td>
                    <td>{userinfo.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <Button
                        variant="success"
                        type="button"
                        onClick={(e) => handleClick(e, userinfo)}
                      >
                        {" "}
                        Edit{" "}
                      </Button>
                    </td>
                    <td>
                      <Button
                        onClick={(e) => handleDelete(e, userinfo)}
                        variant="danger"
                        type="button"
                      >
                        {" "}
                        Delete{" "}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <p>user dashboard</p>
        </div>
      )}
    </div>
  );
}

export default Edituser;
