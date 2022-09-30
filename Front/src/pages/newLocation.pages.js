import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/Form";

import { getVehiculesAvailable } from "../services/vehicules.services";

const NewLocation = () => {
  const [location, setLocation] = useState({
    startDate: "",
    endDate: "",
    prixTotal: 0,
    vehicule: "",
    client: "",
  });

  const updateField = (field, value) => {
    let updatedField = {};
    updatedField = { [field]: value };
    setLocation((location) => ({ ...location, ...updatedField }));
  };

  const handleCheckAvailability = (e) => {
    e.preventDefault()
    console.log(e.target);
    console.log(location);
    getVehiculesAvailable(location.startDate, location.endDate).then((res)=> console.log("res", res))
  };

  return (
    <Card className="mx-auto" style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>New Location Details</Card.Title>
        <Form onSubmit={handleCheckAvailability}>
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            className="mb-3"
            value={location.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
          />
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            className="mb-3"
            value={location.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
          />
          <Button type="submit" onSubmit={handleCheckAvailability}>Check availability</Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewLocation;
