/* eslint-disable no-undef */
import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import config, { expressConfig } from './config';

const app = express();
const host = config.HOST;
const port = config.PORT || 3033;
const apiVersion = config.API_VERSION || 'v1';

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

expressConfig(app);

app.listen(port, () => {
  console.info(`Server started at ${host}:${port}/api/${apiVersion}/`);
});

export default app;
