import CONFIG from "../config/config.json";

const URL = CONFIG.api.locations

export function getLocations() {
  return fetch(URL)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export function createLocation(location) {
  return fetch(URL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(location),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.startDate) {
        return "Location created successfully";
      } else {
        return "Some error occured";
      }
    });
}

export function updateLocation(location) {
  return fetch(`${URL}${location.id}`, {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(location),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.startDate) {
        return "Location updated succesfully";
      } else {
        return "Some error occured";
      }
    });
}

export function deleteLocation(location) {
  return fetch(`${URL}${location.id}`, {
    method: "DELETE",
    mode: "cors",
  })
    .then((res) => {
      if (res.status === 204) {
        return "Location deleted succesfully";
      } else {
        return "Some error occured";
      }
    });
}
