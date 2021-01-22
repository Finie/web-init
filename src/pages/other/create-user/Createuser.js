import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import {
  IoMail,
  FaUserEdit,
  RiLockPasswordLine,
  FaPhoneAlt,
} from "react-icons/all";

import image_url from "../../../assets/avatar.png";
import useLoader from "../../../hooks/useLoader";
import "./createuser.css";

function Createuser() {
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('')
  const [errorMessage, seterrorMessage] = useState('')
  const [selectedImage, setSelectedImage] = useState('')

  const [Loading, isLoading, hideLoading] = useLoader();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleconfirm = (e) => {
    setConfirm(e.target.value);
  };

  const handlefile = (e) => {
    setFile(e.target.files[0]);
    setSelectedImage(URL.createObjectURL(e.target.files[0]))
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess('')
    seterrorMessage('')
    
    if (confirm !== password)return seterrorMessage("Password do not match");
    
    isLoading()
    const fd = new FormData();
    fd.set("useremail", email);
    fd.set("username", username);
    fd.set("phone", phone);
    fd.set("password", password);

    fd.append("file_name", file, file.name);

    console.log(fd);
    axios
      .post("https://koodiweb-service-apis.herokuapp.com/api/users/", fd)
      .then((response) => {
        console.log(response);
        seterrorMessage('')
        setSuccess(`${response.data.status}: ${response.data.description}`)
        hideLoading()
      })
      .catch((error) => {
        hideLoading()
        console.log("errorCaught: ",error.response);
        setSuccess('')
        seterrorMessage(`${error.response.data.status}: ${error.response.data.error.message}`)
      });
  };

  return (
    <div className="create-container">
      {Loading}
      <div className="description">
        <h1>Create New User</h1>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="edit-fields">
          <div className="image-edit">
           {selectedImage ? <img src={selectedImage} className="avatar-image" alt="profile" /> : <img src={image_url} className="avatar-image" alt="profile" />}
            <Form.Group className="form-file">
              <input required onChange={handlefile} type="file" />
            </Form.Group>
            
            <div className="success-message">
            {success && `${success}`}
          </div>

            <div className="error-message">
            {errorMessage && `${errorMessage}`}
          </div>
          </div>

          <div className="text-edits">
            <Form.Group controlId="formGroupUsername">
              <Form.Label className="label">
                <FaUserEdit style={{ marginRight: 6, marginTop: 4 }} /> Username
              </Form.Label>
              <Form.Control
                type="text"
                required
                onChange={handleUsername}
                placeholder="Username"
                value={username}
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label className="label">
                <IoMail style={{ marginRight: 6, marginTop: 4 }} /> Email
                address
              </Form.Label>
              <Form.Control
                type="email"
                required
                onChange={handleEmail}
                placeholder="Enter email"
                value={email}
              />
            </Form.Group>
            <Form.Group controlId="formGroupUsername">
              <Form.Label className="label">
                <FaPhoneAlt style={{ marginRight: 6, marginTop: 4 }} /> Phone
              </Form.Label>
              <Form.Control
                type="tel"
                required
                onChange={handlePhone}
                placeholder="phone number"
                value={phone}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label className="label">
                <RiLockPasswordLine style={{ marginRight: 6, marginTop: 4 }} />{" "}
                Password
              </Form.Label>
              <Form.Control
                type="password"
                required
                onChange={handlePassword}
                placeholder="Password"
                value={password}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label className="label">
                <RiLockPasswordLine style={{ marginRight: 6, marginTop: 4 }} />{" "}
                Confirm Password
              </Form.Label>
              <Form.Control
                type="password"
                required
                onChange={handleconfirm}
                placeholder="Confirm Password"
                value={confirm}
              />
            </Form.Group>
            <div className="submit-button">
              <Button variant="primary" type="submit">
                Create User
              </Button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Createuser;
