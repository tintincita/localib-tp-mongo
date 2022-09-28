import API  from "../config/config.json"
import axios from "axios";

class ClientService {
    // getClientById = (id: string) => {
    //     return axios.get(`http://localhost:8800/api/users/${id}`);
    // };

    getClients = () => {
        return axios.get(API.api.clients);
    };

    // updateClient = async (id) => {
    //     await api.post(`/users/ban/${id}`).catch((err) => console.error(err));
    // };

    // deleteClient = (): void => {
    //     localStorage.clear();
    //     redirect("/");
    // };
}

export const clientService = Object.freeze(new ClientService());