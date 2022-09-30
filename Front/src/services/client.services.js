import CONFIG from "../config/config.json";

const URL = CONFIG.api.clients

export function getClients() {
  return fetch(URL)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function createClient(client) {
  return fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.fullName) {
        return "User created successfully";
      } else {
        return "Some error occured";
      }
    });
}

export function updateClient(client) {
  return fetch(`${URL}${client.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.fullName) {
        return "User updated succesfully";
      } else {
        return "Some error occured";
      }
    });
}

export function deleteClient(client) {
  return fetch(`${CONFIG.api.clients}${client.id}`, {
    method: "DELETE",
    mode: "cors",
  })
    .then((res) => {
      if (res.status === 204) {
        return "User deleted succesfully";
      } else {
        return "Some error occured";
      }
    });
}
