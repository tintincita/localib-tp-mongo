import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import CONFIG from "../../config/config.json";
import { getVehicules } from "../../services/vehicules.services";

const ListingVehicules = ({records, setRecords, handleVehiculeClick}) => {

  useEffect(() => {
    getVehicules().then(records => setRecords(records))
  }, []);

  const renderListing = () => {
    let recordList = [];
    let dispoText = "";

    records.map((record) => {
      record.disponibility ? (dispoText = "yes") : (dispoText = "No");
      return recordList.push(
        <tr key={record.id} onClick={() => handleVehiculeClick(record)}>
          <td>{record.marque}</td>
          <td>{record.model}</td>
          <td>{record.immatriculation}</td>
          <td>{record.etat}</td>
          <td>{record.type}</td>
          <td>{dispoText}</td>
        </tr>
      );
    });
    return recordList;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Marque</th>
          <th>Model</th>
          <th>Immatriculation</th>
          <th>Etat</th>
          <th>Type</th>
          <th>Dispo</th>
        </tr>
      </thead>
      <tbody>{renderListing()}</tbody>
    </Table>
  );
};

export default ListingVehicules;
