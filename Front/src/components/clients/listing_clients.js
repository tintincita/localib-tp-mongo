import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Moment from "react-moment";

import { getClients } from "../../services/client.services";

const ListingClients = ({ records, setRecords, handleClientClick }) => {

  useEffect( () => {
    getClients().then(records => setRecords(records))

  }, []);

  const renderListing = () => {
    let recordList = [];

    records.map((record) => {
      return recordList.push(
        <tr key={record.id}  onClick={() => handleClientClick(record)}>
          <td>{record.fullName}</td>
          <td>
            <Moment format="DD-MM-YYYY">{record.dob}</Moment>
          </td>
          <td>{record.email}</td>
          <td>{record.phone}</td>
        </tr>
      );
    });
    return recordList;
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Date of Birth</th>
          <th>Email</th>
          <th>Phone</th>
        </tr>
      </thead>
      <tbody>{renderListing()}</tbody>
    </Table>
  );
};

export default ListingClients;
