import ListingVehicules from "../components/vehicules/listing_vehicules";
import VehiculeForm from "../components/vehicules/form_vehicule";
import React, { useState } from "react";
import {
  createVehicule,
  getVehicules,
  updateVehicule,
} from "../services/vehicules.services";

const Vehicules = () => {
  const [vehicule, setVehicule] = useState({
    marque: "",
    model: "",
    immatriculation: "",
    etat: "",
    type: "",
    disponibility: "",
    prixJournee: "",
  });
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState([]);

  const handleVehiculeClick = (record) => {
    // record.dob = moment(record.dob).format("YYYY-MM-DD");
    setVehicule(record);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    vehicule.disponibility = true
    vehicule.id
      ? await updateVehicule(vehicule).then((message) => setMessage(message))
      : await createVehicule(vehicule).then((message) => setMessage(message));
    getVehicules().then((records) => setRecords(records));
    clearForm();
  };

  const clearForm = () => {
    setVehicule({
        marque: "",
        model: "",
        immatriculation: "",
        etat: "",
        type: "",
        disponibility: "",
        prixJournee: "",
      });
    setMessage("");
  };

  return (
    <>
      <ListingVehicules
        records={records}
        setRecords={setRecords}
        handleVehiculeClick={handleVehiculeClick}
      />
      <VehiculeForm
        handleSubmit={handleSubmit}
        vehicule={vehicule}
        setVehicule={setVehicule}
        message={message}
        setMessage={setMessage}
        clearForm={clearForm}
      />
    </>
  );
};

export default Vehicules;
