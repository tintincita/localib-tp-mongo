import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/Form";


function LocationForm({ location, setLocation }) {
    
    const updateField = (field, value) => {
      let updatedField = {};
      updatedField = { [field]: value };
      setLocation((location) => ({ ...location, ...updatedField }));
    };

  return (
    <Card className="mx-auto" style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>Location Details</Card.Title>
        <Form>
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
        </Form>
      </Card.Body>
    </Card>
  );
}

export default LocationForm;
