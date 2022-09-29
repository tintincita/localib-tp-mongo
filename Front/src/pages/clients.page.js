import React, { useEffect, useState } from "react";

import ClientForm from "../components/form_client";
import ListingClients from "../components/listing_clients";

import { createClient, getClients } from "../services/client.services";


const Client = () => {
  const [client, setClient] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    createClient(client).then((message) => setMessage(message));
    getClients().then((records) => setRecords(records));
  };

  return (
    <div>
      <ListingClients records={records} setRecords={setRecords} />
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
