import React from "react";
import { Form, Button } from "react-bootstrap";
import { IoMail, FaUserEdit, RiLockPasswordLine } from 'react-icons/all'

import image_url from "../../../assets/avatar.png";
import { userInfo }from '../../../assets/data/DammyUser'
import "./edituser.css";

function Edituser() {

  const handleClick=(user)=>{
    console.log(user)
  }
  
  return (
    <div className="edit-container">


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
              <Form.Label className="label"><FaUserEdit style={{marginRight:6, marginTop:4}}/> Update Username</Form.Label>
              <Form.Control type="text" placeholder="Update Username" />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label className="label"><IoMail style={{marginRight:6, marginTop:4}}/> Update Email address</Form.Label>
              <Form.Control type="email" placeholder="Update Email Address" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label className="label"><RiLockPasswordLine style={{marginRight:6, marginTop:4}}/> Update Password</Form.Label>
              <Form.Control type="password" placeholder="Update Password" />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label className="label"><RiLockPasswordLine style={{marginRight:6, marginTop:4}}/> Confirm Password</Form.Label>
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

      <div className="table">
        <table>
          <thead>
            <tr>
              <td>No.</td>
              <th>UserId</th>
              <th>Username</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Delete User</th>
            </tr>
          </thead>
          <tbody>
            {userInfo.data.map((user,index)=>{
              return(
                <tr>
                  <td>{index}</td>
                  <td>{user.userId}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td><Button variant="success" type="button" onClick={(item)=>handleClick(item)}> Edit </Button></td>
                  <td><Button variant="danger" type="submit"> Delete </Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Edituser;
