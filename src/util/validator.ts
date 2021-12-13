import { validationResult } from 'express-validator';
import express from 'express';
import { HttpResponseCode } from './http-response-code';

/**
 * validates request
 *
 * @param req express request
 * @param res express response
 * @param next express next
 */
export function checkValidationResult(req: Request, res: express.Response, next: express.NextFunction): express.Response | void {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  res.status(HttpResponseCode.BAD_REQUEST).json({ errors: result.array() });
}
