import React, { Component } from 'react';

import CONFIG from '../config/config.json'

class Listing extends Component {

    constructor(props) {
        super(props)
        this.state = {
            records: []
        }

    }

    componentDidMount() {
        console.log(this.props.list);
        console.log(typeof this.props.list);
        fetch(this.props.list)
            .then(response => response.json())
            .then(records => {
                this.setState({
                    records: records
                })
            })
            .catch(error => console.log(error))
    }

    renderListing() {
        let recordList = []
        this.state.records.map(record => {
            console.log(record)
            return recordList.push(<li key={record.id}>{record.fullName}</li>)
        })
        console.log(recordList)
        console.log(typeof recordList)
        console.log(typeof recordList[0])
        return recordList;
    }

    render() {
        return (
            <ul>
                {this.renderListing()}
            </ul>
        );
    }
}

export default Listing;