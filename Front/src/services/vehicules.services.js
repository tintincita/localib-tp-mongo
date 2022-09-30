import CONFIG from "../config/config.json";

const URL = CONFIG.api.vehicules

export function getVehicules() {
  return fetch(URL)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function createVehicule(vehicule) {
  return fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicule),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.Immatriculation) {
        return "Vehicule created successfully";
      } else {
        return "Some error occured";
      }
    });
}

export function updateVehicule(vehicule) {
  return fetch(`${URL}${vehicule.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(vehicule),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.Immatriculation) {
        return "Vehicule updated succesfully";
      } else {
        return "Some error occured";
      }
    });
}

export function deleteVehicule(vehicule) {
  return fetch(`${URL}${client.id}`, {
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

