import { Request, Response } from 'express';
import { AppError } from '../../util/error-handler';
import { HttpResponseCode } from '../../util/http-response-code';
import { BasicMarkdownFormattingRequest } from '../domain/basic-markdown-formatting.request.model';
import * as markdownService from '../service/markdown.service';

/**
 * controller to handle markdown service requests
 *
 * @param req http request
 * @param res string after basic markdown formatting
 */
export async function applyBasicMarkdownFormatting(req: Request, res: Response): Promise<string> {
  try {
    const { text } = req.body;
    console.log('REST request to apply basic markdown formatting on : ' + text);

    const formattedString: string = await markdownService.applyBasicMarkdownFormatting(req.body as BasicMarkdownFormattingRequest);

    return res.status(HttpResponseCode.OK).json(formattedString);
  } catch (e) {
    console.error('[MarkdownController][applyBasicMarkdownFormatting]', e);
    throw new AppError(e.toString(), HttpResponseCode.INTERNAL_SERVER_ERROR);
  }
}
