import React from "react";
import { Card, Form, Button } from "react-bootstrap";

import "./Register.css";

function Register() {
  return (
    <div className="container">
      <Card className="rounded">
        <Card.Body>
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Control type="number" placeholder="phone number" />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <Form.Group>
              <Form.File
                id="exampleFormControlFile1"
                label="Example file input"
              />
            </Form.Group>

            <Button variant="outline-primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Register;
