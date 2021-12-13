import express, { Router } from 'express';
import { HttpResponseCode } from './http-response-code';
const router = express.Router();

/**
 * function for server health check
 */
export function routes(): Router {
  router.route('/ping').get((request, response) => {
    response.status(HttpResponseCode.OK).send('Basic Markdown Service - OK');
  });

  return router;
}
