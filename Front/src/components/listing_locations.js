import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import CONFIG from "../config/config.json";

const ListingLocations = (props) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(CONFIG.api.locations)
      .then((response) => response.json())
      .then((records) => {
        setRecords(records);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderListing = () => {
    let recordList = [];

    records.map((record) => {
      console.log(record);
      return recordList.push(
        <tr>
          <td>{record.startDate}</td>
          <td>{record.endDate}</td>
          <td>{record.prixTotal}</td>
          <td>{record.vehicule.immatriculation}</td>
          <td>{record.client.fullName}</td>
        </tr>
      );
    });
    return recordList;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Prix Total</th>
          <th>Car Plate</th>
          <th>Client</th>
        </tr>
      </thead>
      <tbody>{renderListing()}</tbody>
    </Table>
  );
};

export default ListingLocations;
