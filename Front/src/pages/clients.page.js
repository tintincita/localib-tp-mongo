import React, { useEffect, useState } from "react";
import moment from "moment";

import ClientForm from "../components/clients/form_client";
import ListingClients from "../components/clients/listing_clients";

import { createClient, getClients, updateClient } from "../services/client.services";

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

  const handleSubmit = async (e) => {
    e.preventDefault()

    client.id
    ? await updateClient(client).then((message) => setMessage(message))
    : await createClient(client).then(message => setMessage(message))
    getClients().then((records) => setRecords(records));
  };

  return (
    <div>
      <ListingClients
        records={records}
        setRecords={setRecords}
        handleClientClick={handleClientClick}
      />

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
