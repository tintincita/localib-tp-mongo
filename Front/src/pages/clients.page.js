import React, { useEffect, useState } from "react";
import moment from "moment";

import ClientForm from "../components/clients/form_client";
import ListingClients from "../components/clients/listing_clients";

import { createClient, getClients } from "../services/client.services";
import AddClientButton from "../components/clients/button_add_client";

const Client = () => {
  const [client, setClient] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState([]);

  const handleClientClick = (record) => {
    record.dob = moment(record.dob).format("YYYY-MM-DD");
    setClient(record);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createClient(client).then((message) => setMessage(message));
    getClients().then((records) => setRecords(records));
  };

  const handleAddClientButton = (e) => {
    console.log("ooooh, that was a click");
  };

  return (
    <div>
      <ListingClients
        records={records}
        setRecords={setRecords}
        handleClientClick={handleClientClick}
      />
      <AddClientButton handleAddClientButton={handleAddClientButton} />
      <ClientForm
        handleSubmit={handleSubmit}
        client={client}
        setClient={setClient}
        message={message}
      />
    </div>
  );
};

export default Client;
