import React, { useState } from "react";
import moment from "moment";

import LocationForm from "../components/locations/form_location";
import ListingLocations from "../components/locations/listing_locations";

const Locations = () => {
  const [records, setRecords] = useState([]);
  const [location, setLocation] = useState({
    startDate: "",
    endDate: "",
    prixTotal: 0,
    vehicule: "",
    client: "",
  });

  const handleLocationClick = (record) => {
    record.startDate = moment(record.startDate).format("YYYY-MM-DD");
    setLocation(record);
  };

  return (
    <>
      <ListingLocations
        records={records}
        setRecords={setRecords}
        handleLocationClick={handleLocationClick}
      />
      <LocationForm location={location} setLocation={setLocation} />
    </>
  );
};

export default Locations;
