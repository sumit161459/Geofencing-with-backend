import axios from 'axios';

const url = 'https://citymall-geofence-app.herokuapp.com/location';

export const fetchLocation = () => axios.get(url);
export const createLocation = (newLocation) => axios.post(url, newLocation);
export const updateLocation = (id, updatedLocation) => axios.patch(`${url}/${id}`, updatedLocation);