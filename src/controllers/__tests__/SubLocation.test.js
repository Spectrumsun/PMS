import request from 'supertest';
import models from '../../database/models';
import app from '../../app';


const location = {
  id: 29,
  name: 'Accra'
}

const subLocation = {
  id: 55,
  name: "Ikeja",
  males: 100,
  females: 150,
  totalResidents: 250,
  locationId: 29
}

describe('Pms Sub Location', () => {
  beforeAll(async (done) => {
    await models.Location.create(location);
    await models.SubLocation.create(subLocation);
    done();
  });

  it('should return error if location does not exist', (done) => {
    request(app)
      .post('/api/v1/sub-location')
      .send({
        "name": "Surulere",
        "males": 100,
        "females": 150,
        "locationId": 10000
      })
      .end((error, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Location does mot exist');
        if (error) done(error);
        done();
      });
  });

  it('should save a new Sub Location', (done) => {
    request(app)
      .post('/api/v1/sub-location')
      .send({
        "name": "Surulere",
        "males": 100,
        "females": 150,
        "locationId": 29
      })
      .end((error, res) => {
        expect(res.status).toEqual(201);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('SubLocation added');
        if (error) done(error);
        done();
      });
  });

  it('should return an error if name is empty', (done) => {
    request(app)
      .post('/api/v1/sub-location')
      .end((error, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Error');
        if (error) done(error);
        done();
      });
  });

  it('should return an error if sub-location already exist', (done) => {
    request(app)
      .post('/api/v1/sub-location')
      .send({
        "name": "Surulere",
        "males": 100,
        "females": 150,
        "locationId": 29
      })
      .end((error, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('SubLocation already exist');
        if (error) done(error);
        done();
      });
  });
  it('should get all Sub Location', (done) => {
    request(app)
      .get('/api/v1/sub-locations')
      .end((error, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('SubLocation List');
        if (error) done(error);
        done();
      });
  });

  it('should return an error if Sub Location does not exist when updating ', (done) => {
    request(app)
      .put('/api/v1/sub-location/10000')
      .send({
        "name": "Banter",
        "males": 10,
        "females": 300,
      })
      .end((error, res) => {
        expect(res.status).toEqual(404);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Sub Location does mot exist');
        if (error) done(error);
        done();
      });
  });


  it('should return an error if Sub Location body is empty ', (done) => {
    request(app)
      .put('/api/v1/sub-location/10000')
      .end((error, res) => {
        expect(res.status).toEqual(400);
        expect(res.body.success).toEqual(false);
        expect(res.body.message).toEqual('Error');
        if (error) done(error);
        done();
      });
  });

it('should update a Sub Location', (done) => {
    request(app)
      .put('/api/v1/sub-location/55')
      .send({
        "name":'Tomatos',
        "males": 10,
        "females": 300,
      })
      .end((error, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('SubLocation Updated');
        if (error) done(error);
        done();
      });
  });

  it('should delete a Sub Location', (done) => {
    request(app)
      .delete('/api/v1/sub-location/55')
      .end((error, res) => {
        expect(res.status).toEqual(200);
        expect(res.body.success).toEqual(true);
        expect(res.body.message).toEqual('SubLocation Deleted');
        if (error) done(error);
        done();
      });
  });
});