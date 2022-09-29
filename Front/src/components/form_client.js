import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import React, { useEffect, useState } from "react";

import CONFIG from '../config/config.json'

function ClientForm() {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(CONFIG.api.clients, {
        method: "POST",
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: fullName,
          dob: dob,
          email: email,
          phone: phone,
        }),
      });
      console.log(res);
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setFullName("");
        setDob("");
        setEmail("");
        setPhone("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className="mx-auto" style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>Client Details</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formClientFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClientDob" value={dob} onChange={(e) => setDob(e.target.value)}>
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClientEmail" value={email} onChange={(e) => setEmail(e.target.value)}>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formClientPhone" value={phone} onChange={(e) => setPhone(e.target.value)}>
            <Form.Label>Phone</Form.Label>
            <Form.Control type="email" placeholder="00 0000 0000" />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
      </Card.Body>
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </Card>
  );
}

export default ClientForm;
