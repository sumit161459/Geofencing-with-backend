import express from 'express';
import mongoose from 'mongoose';

import LocationDetails from '../models/locationDetails.js';

const router = express.Router();

export const getLocation = async (req, res) => { 
    const { id } = req.params;
    try {
        const locationDetails = await LocationDetails.findById(id);
        res.status(200).json(locationDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createLocation = async (req, res) => {
    console.log(req.body);
    const {latitude,longitude} = req.body;

    const newLocationDetails = new LocationDetails({ latitude,longitude })

    try {
        await newLocationDetails.save();

        res.status(201).json(newLocationDetails);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updateLocation = async (req, res) => {
    const { id } = req.params;
    const {latitude,longitude} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No location with id: ${id}`);

    const updatedLocation = { latitude,longitude, _id: id };

    await LocationDetails.findByIdAndUpdate(id, updatedLocation, { new: true });

    res.json(updatedLocation);
}

export default router;