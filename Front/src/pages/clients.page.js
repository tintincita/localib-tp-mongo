import { useState, useEffect } from "react";
import ListingClients from "../components/listing_clients";

import { clientService } from "../services/client.services";

const Client = () => {
  return <ListingClients />;
};

export default Client;
