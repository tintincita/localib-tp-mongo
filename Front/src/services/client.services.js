import CONFIG from "../config/config.json";

export function getClients() {
  return fetch(CONFIG.api.clients)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function createClient(client) {
  return fetch(CONFIG.api.clients, {
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
  return fetch(`${CONFIG.api.clients}${client.id}`, {
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
