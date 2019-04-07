import request from 'supertest';
import models from '../../database/models';
import app from '../../app';

const location = {
  id: 90,
  name: 'Ibadan'
}

const subLocation = {
  id: 100,
  name: "Somolu",
  males: 100,
  females: 150,
  totalResidents: 250,
  locationId: 90
}
describe('Pms Location', () => {
  beforeAll(async (done) => {
    await models.Location.create(location);
    await models.SubLocation.create(subLocation);
    done();
  });
  it('should return the success on /api/v1', (done) => {
    request(app)
      .get('/api/v1/')
      .end((error, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('PMS API');
        if (error) done(error);
        done();
      });
  });

  it('should return the error if url does not exist on /api/v1', (done) => {
    request(app)
      .post('/api/v1/unknow')
      .end((error, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.success).toEqual(false);
        if (error) done(error);
        done();
      });
  });

  it('should return an error if name is empty', (done) => {
    request(app)
      .post('/api/v1/location')
      .end((error, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Error');
        if (error) done(error);
        done();
      });
  });

  it('should save a new Location', (done) => {
    request(app)
      .post('/api/v1/location')
      .send({
        name: 'Lagos'
      })
      .end((error, res) => {
        expect(res.status).toEqual(201);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Location Added');
        if (error) done(error);
        done();
      });
  });

  it('should return an error if location already exist', (done) => {
    request(app)
      .post('/api/v1/location')
      .send({
        name: 'Lagos'
      })
      .end((error, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Location already exist');
        if (error) done(error);
        done();
      });
  });

  it('should get all Location', (done) => {
    request(app)
      .get('/api/v1/locations')
      .end((error, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Location List');
        if (error) done(error);
        done();
      });
  });

  it('should update a Location', (done) => {
    request(app)
      .put('/api/v1/location/90')
      .send({
        name: 'State'
      })
      .end((error, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('Location updated');
        if (error) done(error);
        done();
      });
  });


  it('should return an error for a location that does not exist when updating', (done) => {
    request(app)
      .put('/api/v1/location/9900')
      .send({
        name: 'Lagos  State'
      })
      .end((error, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('location not found');
        if (error) done(error);
        done();
      });
  });
 });