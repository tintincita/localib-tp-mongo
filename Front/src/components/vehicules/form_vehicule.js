import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import React, { useEffect } from "react";
import Select from 'react-select';

import { deleteVehicule } from "../../services/vehicules.services";

function VehiculeForm({
  handleSubmit,
  vehicule,
  setVehicule,
  message,
  setMessage,
  clearForm,
}) {
  useEffect(() => { }, [vehicule, setVehicule]);

  const optionsEtat = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' }
  ]
  const optionsType = [
    { value: 'Voiture', label: 'Voiture' },
    { value: 'Camion', label: 'Camion' },
    { value: 'Utilitaire', label: 'Utilitaire' },
    { value: 'Moto', label: 'Moto' }
  ]

  const updateField = (field, value) => {
    let updatedField = {};
    updatedField = { [field]: value };
    setVehicule((vehicule) => ({ ...vehicule, ...updatedField }));
  };

  const handleClearForm = () => {
    clearForm();
  };

  const handleDeleteVehicule = async () => {
    await deleteVehicule(vehicule).then((message) => setMessage(message));
    clearForm();
  };

  let deleteVehiculeStyle = { display: "none" };
  if (vehicule.id) {
    deleteVehiculeStyle = {};
  }

  const handleEtatSelect = e => {
    updateField("etat", e.value);
  };
  const handleTypeSelect = e => {
    updateField("type", e.value);
  };

  return (
    <Card className="mx-auto" style={{ width: "50%" }}>
      <Card.Body>
        <Card.Title>Edit Vehicule Details</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Marque</Form.Label>
          <Form.Control
            type="text"
            value={vehicule.marque}
            onChange={(e) => updateField("marque", e.target.value)}
          />

          <Form.Label>Model</Form.Label>
          <Form.Control
            type="text"
            className="mb-3"
            value={vehicule.model}
            onChange={(e) => updateField("model", e.target.value)}
          />

          <Form.Label>Immatriculation</Form.Label>
          <Form.Control
            type="text"
            className="mb-3"
            value={vehicule.immatriculation}
            onChange={(e) => updateField("immatriculation", e.target.value)}
          />
          <Form.Label>Etat</Form.Label>
          <Select options={optionsEtat} value={optionsEtat.filter(function(option) {
          return option.value === vehicule.etat;
        })} onChange= {handleEtatSelect}/>

          <Form.Label>Type</Form.Label>
          <Select options={optionsType} value={optionsType.filter(function(option) {
          return option.value === vehicule.type;
        })} onChange= {handleTypeSelect}/>
          <Form.Label>Prix Journée</Form.Label>
          <Form.Control
            type="number"
            className="mb-3"
            value={vehicule.prixJournee}
            onChange={(e) => updateField("prixJournee", e.target.value)}
          />

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              size="lg"
              type="submit"
              onSubmit={handleSubmit}
            >
              Submit Form
            </Button>{" "}
            <Button variant="primary" type="reset" onClick={handleClearForm}>
              Clear Form
            </Button>{" "}
            <Button
              variant="danger"
              type="submit"
              onClick={handleDeleteVehicule}
              style={deleteVehiculeStyle}
            >
              Delete Vehicule
            </Button>{" "}
          </div>
        </Form>
      </Card.Body>
      <div className="message">{message ? <p>{message}</p> : null}</div>
    </Card>
  );
}

export default VehiculeForm;
