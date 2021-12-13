import express from 'express';
import cors from 'cors';

import * as healthCheckRoutes from './util/server-health-check';
import * as markDownRoutes from './markdown/route/markdown.route';
import morgan from 'morgan';

const app = express();
const BASE_PATH = '/basic-markdown-service';

app.use(express.json());
app.use(cors({ origin: true }));

// Logs statistics about request and response after response is sent and saves us from manually adding logs to all controllers
app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      '-',
      'Status',
      tokens.status(req, res),
      '-',
      tokens['response-time'](req, res),
      'ms',
    ].join(' ');
  })
);

app.use(BASE_PATH, healthCheckRoutes.routes());
app.use(BASE_PATH, markDownRoutes.routes());

const APP_PORT = process.env.APP_PORT ? +process.env.APP_PORT : 5000;

app.listen(APP_PORT, () => {
  console.log(`Node markdown api app listening at http://localhost:${APP_PORT}`);
});
