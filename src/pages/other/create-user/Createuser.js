import React from "react";
import { Form, Button } from "react-bootstrap";
import { IoMail, FaUserEdit, RiLockPasswordLine } from "react-icons/all";

import image_url from "../../../assets/avatar.png";

import "./createuser.css";

function Createuser() {
  return (
    <div className="create-container">
      <div className="description">
        <h1>Create New User</h1>
      </div>
      <div className="edit-fields">
        <div className="image-edit">
          <img src={image_url} className="avatar-image" alt="profile-image" />
          <Form className="form-file">
            <input type="file" />
          </Form>
        </div>

        <div className="text-edits">
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label className="label">
                <FaUserEdit style={{ marginRight: 6, marginTop: 4 }} /> Username
              </Form.Label>
              <Form.Control type="text" placeholder="username" />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label className="label">
                <IoMail style={{ marginRight: 6, marginTop: 4 }} /> Email
                address
              </Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label className="label">
                <RiLockPasswordLine style={{ marginRight: 6, marginTop: 4 }} />{" "}
                Password
              </Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label className="label">
                <RiLockPasswordLine style={{ marginRight: 6, marginTop: 4 }} />{" "}
                Confirm Password
              </Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>
            <div className="submit-button">
              <Button variant="primary" type="submit">
                Update profile
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Createuser;
