import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import { deleteClient } from "../../services/client.services";


function ClientForm({ handleSubmit, client, setClient, message, setMessage, clearForm }) {
  useEffect(() => { }, [client, setClient])

  const updateField = (field, value) => {
    let updatedField = {};
    updatedField = { [field]: value };
    setClient((client) => ({ ...client, ...updatedField }));
  };

  const handleClearForm = () => {
    clearForm()
  }

  const urlForNewLocation = "/newLocation/"+client.id
  console.log(urlForNewLocation);

  const handleDeleteClient = async () => {
    await deleteClient(client).then((message) => setMessage(message))
    clearForm()
  }

  let clientLoadedStyle = { display: "none" }
  if (client.id) {
    clientLoadedStyle = {}
  }

  return (
    <>
      <Button variant="primary" size="lg" type="submit" href={urlForNewLocation} style={clientLoadedStyle}>
        Book a Car
      </Button>{' '}
      <Card className="mx-auto" style={{ width: "50%" }}>
        <Card.Body>
          <Card.Title>Client Details</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={client.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
            />

            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="date"
              className="mb-3"
              value={client.dob}
              onChange={(e) => updateField("dob", e.target.value)}
            />

            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              className="mb-3"
              value={client.email}
              onChange={(e) => updateField("email", e.target.value)}
            />

            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="string"
              placeholder="00 0000 0000"
              className="mb-3"
              value={client.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />

            <div className="d-grid gap-2">
              <Button variant="primary" size="lg" type="submit" onSubmit={handleSubmit}>
                Update Client Details
              </Button>{' '}
              <Button variant="primary" type="reset" onClick={handleClearForm}>
                Clear Form
              </Button>{' '}
              <Button variant="danger" type="submit" onClick={handleDeleteClient} style={clientLoadedStyle}>
                Delete Client
              </Button>{' '}
            </div>
          </Form>
        </Card.Body>
        <div className="message">{message ? <p>{message}</p> : null}</div>
      </Card>
    </>
  );
}

export default ClientForm;
