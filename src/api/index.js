import axios from 'axios';

const url = 'http://localhost:5000/location';

export const fetchLocation = () => axios.get(url);
export const createLocation = (newLocation) => axios.post(url, newLocation);
export const updateLocation = (id, updatedLocation) => axios.patch(`${url}/${id}`, updatedLocation);