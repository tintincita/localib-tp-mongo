import { useState, useEffect } from "react";
import ClientForm from "../components/form_client";

import ListingClients from "../components/listing_clients";


const Client = () => {
  return <div>
    <ListingClients />
    <ClientForm />
    </div>
};

export default Client;
