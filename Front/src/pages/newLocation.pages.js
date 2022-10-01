import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/esm/Table";
import Moment from "moment";

import { getVehiculesAvailable } from "../services/vehicules.services";
import { createLocation } from "../services/locations.services"


const NewLocation = () => {
  // console.log("client: ", client);
  // console.log(data);
  // console.log(window.location.href)
  // let wholeUrl = window.location.href
  // console.log(wholeUrl);
  // let bitIwant = wholeUrl.slice(-24)
  // console.log("bitIwant", bitIwant);
  let client = window.location.href.slice(-24)
  
  const [location, setLocation] = useState({
    startDate: "",
    endDate: "",
    vehicule: "",
    client: client,
  });
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("")


  console.log("location: ", location);
  
  const updateField = (field, value) => {
    let updatedField = {};
    updatedField = { [field]: value };
    setLocation((location) => ({ ...location, ...updatedField }));
  };
  
  const handleCheckAvailability = (e) => {
    e.preventDefault();
    // setLocation((location) => ({ ...location, ...{ client: client.id } }));
    console.log(e.target);
    console.log(location);
    
    getVehiculesAvailable(location.startDate, location.endDate).then((res) => {
      console.log("res", res);
      setRecords(res);
    });
  };
  
  const handleVehiculeClick = (record) => {
    setLocation((location) => ({ ...location, ...{ vehicule: record.id } }));
  };
  
  const handleLocationSubmit = () => {
    try { 
      createLocation(location)
      setMessage("Location successful")
    } catch(error) {
      console.log(error);
      setMessage("something went wrong")
    }
  };
  
  const renderListing = () => {
    let recordList = [];
    
    records.map((record) => {
      return recordList.push(
        <tr key={record.id} onClick={() => handleVehiculeClick(record)}>
          <td>{record.marque}</td>
          <td>{record.model}</td>
          <td>{record.immatriculation}</td>
          <td>{record.etat}</td>
          <td>{record.type}</td>
        </tr>
      );
    });
    return recordList;
  };
  
  
  return (
    <>
      <Card className="mx-auto">
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
            <Button type="submit" onSubmit={handleCheckAvailability}>
              Check availability
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card className="mx-auto">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Marque</th>
              <th>Model</th>
              <th>Immatriculation</th>
              <th>Etat</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>{renderListing()}</tbody>
        </Table>
      </Card>
      <Card>Car selected: {location.vehicule}</Card>
      <Button onClick={handleLocationSubmit}>Got for it</Button>
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </>
  );
};

export default NewLocation;
