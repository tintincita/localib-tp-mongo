import { useState, useEffect } from "react";
import ClientForm from "../components/form_client";

import ListingClients from "../components/listing_clients";

const Client = ({
  client,
  setClient,
  message,
  setMessage,
}) => {
  return (
    <div>
      <ListingClients />
      <ClientForm
        client={client}
        setClient={setClient}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default Client;
