import express from 'express';
import SubLocation from '../controllers/SubLocation';
import Location from '../controllers/Location';
import { validateSubLocation, validateLocation, findItem, findSubLocation } from '../middleware'

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200)
    .json({
      success: true,
      message: 'PMS API'
    });
});

router.post(
  '/sub-location',
  validateSubLocation,
  findItem,
  SubLocation.createSubLocation
);

router.get(
  '/sub-locations',
  SubLocation.getSubLocations
);

validateSubLocation.pop();

router.put(
  '/sub-location/:id',
  validateSubLocation,
  findSubLocation,
  SubLocation.updateSubLocation
);

router.delete(
  '/sub-location/:id',
  findSubLocation,
  SubLocation.deleteSubLocation
);

router.post(
  '/location',
  validateLocation,
  Location.createLocation
);

router.get(
  '/locations',
  Location.getLocation
);


router.put(
  '/location/:id',
  Location.locationUpdate
);

// A catch-all routes
router.use('*', (req, res) =>
  res.status(404).json({
    success: false,
    message: 'That url or Http method is not correct 🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫',
  }));


export default router;