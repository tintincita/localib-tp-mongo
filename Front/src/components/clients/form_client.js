import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import React from "react";


function ClientForm({handleSubmit, client, setClient, message }) {


  const updateField = (field, value) => {
    let updatedField = {};
    updatedField = { [field]: value };
    setClient((client) => ({ ...client, ...updatedField }));
  };

  const handleClearForm = () => {
    setClient({
      fullName: "",
      dob: "",
      email: "",
      phone: "",
    })
  }

  return (
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
          <Button variant="primary" type="submit" onSubmit={handleSubmit}>
            Submit
          </Button>
        </Form>
          <Button variant="primary" type="submit" onClick={handleClearForm}>
            Clear Form
          </Button>
      </Card.Body>
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </Card>
  );
}

export default ClientForm;
