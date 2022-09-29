import React, {  useEffect, useState } from 'react';


export default ListingClient = (props) => {
    const [records, setRecords] = useState([])

    useEffect(() => {
        fetch(props.list)
        .then(response => response.json())
        .then(records => {
            setRecords(records)
        })
        .catch(error => console.log(error))
    }, [])

    const renderListing = () => {
        let recordList = []

        records.map(record => {
            return recordList.push(<li key={record.id}>{record.fullName}</li>)
        })
        return recordList;
    }

    return(
        <ul>
            {renderListing()}
        </ul>
    )
}
