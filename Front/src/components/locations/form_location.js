import Card from "react-bootstrap/esm/Card";
import CardGroup from 'react-bootstrap/CardGroup';
import ListGroup from 'react-bootstrap/ListGroup';


function LocationForm({ location, setLocation }) {

  const updateField = (field, value) => {
    let updatedField = {};
    updatedField = { [field]: value };
    setLocation((location) => ({ ...location, ...updatedField }));
  };

  return (
    <><h1>Location Details</h1>
      <CardGroup >
        <Card className="mx-auto">
          <Card.Body>
            <Card.Header>CLIENT</Card.Header>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Full Name: {location.client.fullName}</ListGroup.Item>
              <ListGroup.Item>Date of Birth: {location.client.dob}</ListGroup.Item>
              <ListGroup.Item>eMail: {location.client.email}</ListGroup.Item>
              <ListGroup.Item>phone: {location.client.phone}</ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
        <Card className="mx-auto">
          <Card.Header>VEHICULE</Card.Header>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Marque: {location.vehicule.marque}</ListGroup.Item>
            <ListGroup.Item>Model: {location.vehicule.model}</ListGroup.Item>
            <ListGroup.Item>Immatriculation: {location.vehicule.immatriculation}</ListGroup.Item>
            <ListGroup.Item>Etat: {location.vehicule.etat}</ListGroup.Item>
            <ListGroup.Item>Type: {location.vehicule.type}</ListGroup.Item>
          </ListGroup>
        </Card>
      </CardGroup>
    </>
  );
}

export default LocationForm;
