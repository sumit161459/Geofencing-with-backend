import mongoose from 'mongoose';

const locationSchema = mongoose.Schema({
    latitude:Number,
    longitude:Number
})

var LocationDetails = mongoose.model('LocationDetails', locationSchema);

export default LocationDetails;