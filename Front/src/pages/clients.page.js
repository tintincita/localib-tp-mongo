import { useState, useEffect } from "react";
import ClientForm from "../components/form_client";

import ListingClients from "../components/listing_clients";

const Client = ({
  fullName,
  setFullName,
  dob,
  setDob,
  email,
  setEmail,
  phone,
  setPhone,
  message,
  setMessage,
}) => {
  return (
    <div>
      <ListingClients />
      <ClientForm
        fullName={fullName}
        setFullName={setFullName}
        dob={dob}
        setDob={setDob}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        message={message}
        setMessage={setMessage}
      />
    </div>
  );
};

export default Client;
