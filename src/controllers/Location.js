import models from '../database/models';
import { validationResult } from 'express-validator/check';
import Helper from '../helper';

class Location {
  static async createLocation(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return Helper.handleResponse(res, 400, false, 'Error', errors.array());
      }
      const Location = await models.Location.create({ ...req.body })
      return Helper.handleResponse(res, 201, true, 'Location Added', Location);
    } catch (error) {
      return Helper.handleResponse(res, 400, false, 'Location already exist', error);
    }
  }

  static async getLocation(req, res) {
    const locations = await models.Location.findAll({
      include: [
        {
          model: models.SubLocation,
          as: 'subLocation',
          attributes: ['name', 'males', 'females', 'totalResidents', 'locationId'],
        }
      ]
    });
    const population = Location.calculatePopulation(locations)
    return Helper.handleResponse(res, 200, true, 'Location List', population);
  }

  static async locationUpdate(req, res) {
    try {
      const { params: { id }, body: { name } } = req;
      const update = await models.Location.update({ name }, {
        returning: true,
        where: { id }
      });
      return update[0] === 0 ?
        Helper.handleResponse(res, 404, true, 'location not found', update) :
        Helper.handleResponse(res, 200, true, 'Location updated', update);
    } catch (error) {
      return Helper.handleResponse(res, 400, false, 'An error occured', error);
    }
  }

  static calculatePopulation(locations) {
    const total = locations.map((totals) =>
      totals.subLocation.map((getIt) =>
        getIt.totalResidents
      )
    )
   total.push(0);

   const addIt =  [].concat.apply([], total).reduce((a, b) => a + b);
    return {
      totalPopulation: addIt,
      locations
    }
  }
};

export default Location;
