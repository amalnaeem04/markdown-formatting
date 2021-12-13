import express, { Router } from 'express';
const router = express.Router();

import * as markdownController from '../controller/markdown.controller';
import * as validators from '../validator/markdown.validator';
import { checkValidationResult } from '../../util/validator';
/**
 * routes for markdown service - redirects to the correspondong controller after validating the request
 */
export function routes(): Router {
  router
    .route('/api/v1/markdown')
    .post(validators.markdownValidator(), checkValidationResult, markdownController.applyBasicMarkdownFormatting);

  return router;
}
