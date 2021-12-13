import { body, ValidationChain } from 'express-validator';

/**
 * validation for create session request
 */
export function markdownValidator(): ValidationChain[] {
  return [
    body('text').isString().withMessage('text is required'),
    body('parameters').isObject().isLength({ min: 1 }).withMessage('atleast 1 parameter is required'),
  ];
}
