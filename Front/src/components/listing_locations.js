import React, {  useEffect, useState } from 'react';
import CONFIG from '../config/config.json'

const ListingLocations = (props) => {
    const [records, setRecords] = useState([])

    useEffect(() => {
        fetch(CONFIG.api.locations)
        .then(response => response.json())
        .then(records => {
            setRecords(records)
        })
        .catch(error => console.log(error))
    }, [])

    const renderListing = () => {
        let recordList = []

        records.map(record => {
            console.log(record);
            return recordList.push(<li key={record.id}>{record.startDate} {record.endDate} {record.vehicule.marque} {record.client.fullName}</li>)
        })
        return recordList;
    }

    return(
        <ul>
            {renderListing()}
        </ul>
    )
}

export default ListingLocations