import { check, validationResult } from 'express-validator/check';
import models from '../database/models';
import Helper from '../helper';

export const validateSubLocation = [
  check('name').isLength({ min: 3 }).withMessage('Name cannot be empty'),
  check('males').isInt().withMessage('Males must be a digit'),
  check('females').isInt().withMessage('Females must be a digit'),
  check('locationId').isInt().withMessage('locationId must be a digit'),
];

export const validateLocation = [
  check('name').isLength({ min: 1 }).withMessage('Name cannot be empty'),
];

export const findItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return Helper.handleResponse(res, 400, false, 'Error', errors.array());
  }
  const findLocation = await models.Location.findOne({
    where: { id: req.body.locationId }
  })
  if (findLocation === null) {
    return Helper.handleResponse(res, 404, false, 'Location does mot exist')
  }
  req.findLocation = findLocation;
  next();
}

export const findSubLocation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return Helper.handleResponse(res, 400, false, 'Error', errors.array());
  }
  const findSubLocation = await models.SubLocation.findOne({
    where: { id: req.params.id }
  })
  if (findSubLocation === null) {
    return Helper.handleResponse(res, 404, false, 'Sub Location does mot exist')
  }
  const findLocation = await models.Location.findOne({
    where: { id: findSubLocation.locationId}
  })
  req.findSubLocation = findSubLocation;
  req.MyLocation = findLocation;
  next();
}
