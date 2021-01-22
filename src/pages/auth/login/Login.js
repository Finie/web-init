import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import useLoader from "../../../hooks/useLoader";
import { Link, useHistory } from "react-router-dom";

import "./Login.css";

function Login() {
  const [Loading, isLoading, hideLoading] = useLoader();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, seterrorMessage] = useState("");
  let history = useHistory();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onSumbintForm = (e) => {
    e.preventDefault();
    isLoading();
    const authInfo = {
      useremail: email,
      password: password,
    };

    axios
      .post("https://koodiweb-service-apis.herokuapp.com/api/auth", authInfo)
      .then((response) => {
        localStorage.setItem("token", response.data.data.token);

        let isAdmin = "user";

        if (response.data.data.isAdmin) {
          isAdmin = "admin";
        }

        localStorage.setItem("isAdmin", isAdmin);
        history.push("/dashboard");
        hideLoading();
        window.location.reload(false);
      })
      .catch((error) => {
        seterrorMessage(error.response.data.error.message);
        hideLoading();
      });
  };

  return (
    <div className="container">
      {Loading}
      <Card>
        <Card.Body>
          <Form onSubmit={onSumbintForm}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                onChange={handleEmail}
                value={email}
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                value={password}
                onChange={passwordHandler}
                placeholder="Password"
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

        <Link to={"/register"}>I dont have an account</Link>
      </Card>
    </div>
  );
}

export default Login;
