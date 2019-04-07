import "core-js";
import "regenerator-runtime/runtime";
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes';

const app = express();

app.use(morgan('dev'));

app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true
  }),
bodyParser.json()
);

app.use('/api/v1/', routes);

export default app;