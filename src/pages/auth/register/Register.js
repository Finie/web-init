import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import useLoader from "../../../hooks/useLoader";
import { useHistory } from 'react-router-dom'

import "./Register.css";

function Register() {
  const [Loading, isLoading, hideLoading] = useLoader();
  const [confirm, setConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState(null);
  const [errorMessage, seterrorMessage] = useState("");
  let history = useHistory()

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    isLoading();

    if (confirm !== password) {
      seterrorMessage("Password do not match");
      hideLoading();
      return console.log("password dont match");
    }

    const fd = new FormData();
    fd.set("useremail", email);
    fd.set("username", username);
    fd.set("phone", phone);
    fd.set("password", password);

    fd.append("file_name", file, file.name);

    console.log(fd);
    axios
      .post("https://koodiweb-service-apis.herokuapp.com/api/users", fd)
      .then((response) => {
        console.log(response);
        hideLoading();
        history.push('/')
      })
      .catch((error) => {
        console.log(error.response);
        hideLoading();
      });
  };

  return (
    <div className="container">
      {Loading}
      <Card className="rounded">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="text"
                required
                onChange={handleUsername}
                placeholder="Username"
                value={username}
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="tel"
                required
                onChange={handlePhone}
                placeholder="phone number"
                value={phone}
              />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Control
                type="email"
                required
                onChange={handleEmail}
                placeholder="Enter email"
                value={email}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control
                type="password"
                required
                onChange={handlePassword}
                placeholder="Password"
                value={password}
              />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control
                type="password"
                required
                onChange={handleconfirm}
                placeholder="Confirm Password"
                value={confirm}
              />
            </Form.Group>

            <Form.Group className="file-input">
              <Form.Label>Select image</Form.Label>
              <Form.File
                required
                className="file-selector"
                onChange={handlefile}
              />
            </Form.Group>

            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
          <div className="error-message">
            {errorMessage && `Error: ${errorMessage}`}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
