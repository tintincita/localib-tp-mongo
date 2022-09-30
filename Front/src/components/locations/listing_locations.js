import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Moment from "react-moment";

import { getLocations } from "../../services/locations.services";

const ListingLocations = ({records, setRecords, handleLocationClick}) => {
  

  useEffect(() => {
    getLocations().then(records => setRecords(records))

  }, []);

  const renderListing = () => {
    let recordList = [];

    records.map((record) => {
      return recordList.push(
        <tr key={record.id} onClick={()=> handleLocationClick(record)}>
          <td><Moment format="DD-MM-YYYY">{record.startDate}</Moment></td>
          <td><Moment format="DD-MM-YYYY">{record.endDate}</Moment></td>
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
