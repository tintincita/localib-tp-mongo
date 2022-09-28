import { useState, useEffect } from "react";

import { clientService } from "../services/client.services";


const Client = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            const response = await clientService.getClients()
            setClients(response.data)
        }
        fetchClients()
    })
    
    console.log(clients);

    return (
        <div>
            Clients
        </div>
    )
}

export default Client