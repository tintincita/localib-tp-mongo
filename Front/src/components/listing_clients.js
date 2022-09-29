import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

import CONFIG from "../config/config.json";

const ListingClients = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch(CONFIG.api.clients)
      .then((response) => response.json())
      .then((records) => {
        setRecords(records);
      })
      .catch((error) => console.log(error));
  }, []);

  const renderListing = () => {
    let recordList = [];

    records.map((record) => {
      return recordList.push(
        <tr key={record.id}>
          <td>{record.fullName}</td>
          <td>{record.dob}</td>
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
      <tbody>
      {renderListing()}
      </tbody>
    </Table>
  );
};

export default ListingClients;
