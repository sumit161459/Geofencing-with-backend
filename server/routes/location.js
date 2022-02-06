import express from 'express';

import { getLocation,createLocation,updateLocation} from '../controllers/location.js';

const router = express.Router();
 

router.post('/', createLocation);
router.get('/:id', getLocation);
router.patch('/:id', updateLocation);

export default router;