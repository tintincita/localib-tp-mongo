import React, { useEffect, useState } from "react";

import ClientForm from "../components/form_client";
import ListingClients from "../components/listing_clients";

import CONFIG from "../config/config.json";

const Client = () => {
  const [client, setClient] = useState({});
  const [message, setMessage] = useState("");
  const [records, setRecords] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // TODO: move fetch to client.service
      console.log(client);
      let res = await fetch(CONFIG.api.clients, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });
      console.log(res);
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setClient({});
        setMessage("User created successfully");
        //TODO: move this to client.service
        fetch(CONFIG.api.clients)
        .then((response) => response.json())
        .then((records) => {
          setRecords(records);
        })
        .catch((error) => console.log(error));

      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ListingClients records={records} setRecords={setRecords} />
      <ClientForm
        handleSubmit={handleSubmit}
        client={client}
        setClient={setClient} message = {message}
      />
    </div>
  );
};

export default Client;
