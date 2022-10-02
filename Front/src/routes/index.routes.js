import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import React from "react";

import Clients from "../pages/clients.page";
import Locations from "../pages/locations.pages";
import Vehicules from "../pages/vehicules.page";
import NewLocation from "../pages/newLocation.pages";

const index = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/clients" element={<Clients />} />
          <Route path="/vehicules" element={<Vehicules />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/newLocation/:id" element={<NewLocation />} />
          <Route path="/" element={<Navigate to="/clients" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default index;
