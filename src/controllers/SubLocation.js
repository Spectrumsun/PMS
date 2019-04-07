import models from '../database/models';
import { Op } from 'sequelize';
import Helper from '../helper';
import { validationResult } from 'express-validator/check';


class SubLocation {
  static async createSubLocation(req, res) {
    try {
      const { findLocation, body: { males, females } } = req;
      const totalResidents = Number(males) + Number(females);
      const SubLocation = await models.SubLocation.create({ ...req.body, totalResidents })
      const update = findLocation.population + totalResidents
      findLocation.update({ population: update })
      return Helper.handleResponse(res, 201, true, 'SubLocation added', SubLocation);
    } catch (error) {
      return Helper.handleResponse(res, 400, false, 'SubLocation already exist');
    }
  }

  static async getSubLocations(req, res) {
    const SubLocation = await models.SubLocation.findAll({
      include: [
        {
          model: models.Location,
          as: 'location',
          attributes: ['name'],
        }
      ]
    });
    return Helper.handleResponse(res, 200, true, 'SubLocation List', SubLocation);
  }

  static async updateSubLocation(req, res) {
    const { body:{ name, males, females },
      findSubLocation, MyLocation } = req;
    const totalResidents = Number(males) + Number(females);
    const cal = MyLocation.population - findSubLocation.totalResidents
    await findSubLocation.update({ name, males, females, totalResidents })
    const newTotal = cal + totalResidents;
    MyLocation.update({ population: newTotal })
    return Helper.handleResponse(res, 200, true, 'SubLocation Updated', findSubLocation);
  }

  static async deleteSubLocation(req, res) {
    const { findSubLocation, MyLocation } = req;
    const reduce = MyLocation.population - findSubLocation.totalResidents
    await MyLocation.update({ population: reduce })
    await findSubLocation.destroy();
    return Helper.handleResponse(res, 200, true, 'SubLocation Deleted')
  }
};

export default SubLocation;
