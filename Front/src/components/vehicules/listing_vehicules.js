import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import CONFIG from "../../config/config.json";

const ListingVehicules = (props) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(CONFIG.api.vehicules)
      .then((response) => response.json())
      .then((records) => {
        setRecords(records);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderListing = () => {
    let recordList = [];
    let dispoText = "";

    records.map((record) => {
      record.disponibility ? (dispoText = "yes") : (dispoText = "No");
      return recordList.push(
        <tr key={record.id}>
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
