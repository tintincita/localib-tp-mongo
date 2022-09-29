import React, {  useEffect, useState } from 'react';
import CONFIG from '../config/config.json'

const ListingVehicules = (props) => {
    const [records, setRecords] = useState([])

    useEffect(() => {
        fetch(CONFIG.api.vehicules)
        .then(response => response.json())
        .then(records => {
            setRecords(records)
        })
        .catch(error => console.log(error))
    }, [])

    const renderListing = () => {
        let recordList = []

        records.map(record => {
            return recordList.push(<li key={record.id}>{record.model} {record.marque} {record.immatriculation}</li>)
        })
        return recordList;
    }

    return(
        <ul>
            {renderListing()}
        </ul>
    )
}

export default ListingVehicules