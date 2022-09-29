import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import React, { useEffect, useState } from "react";

import Clients from "../pages/clients.page";
import Locations from "../pages/locations.pages";
import Vehicules from "../pages/vehicules.page";

const index = () => {

  const [client, setClient] = useState({});
  const [message, setMessage] = useState("");

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/clients"
            element={
              <Clients
                client={client}
                setClient={setClient}
                message={message}
                setMessage={setMessage}
              />
            }
          />
          <Route path="/vehicules" element={<Vehicules />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/" element={<Navigate to="/vehicules" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
