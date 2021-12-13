import axios from 'axios';
import { factory } from 'typescript';
import { CHUCK_NORRIS_API_ENDPOINT } from '../../constants';
import { AppError } from '../../util/error-handler';
import { HttpResponseCode } from '../../util/http-response-code';
import { BasicMarkdownFormattingRequest, ReplacementPair } from '../domain/basic-markdown-formatting.request.model';
import { ChuckNorrisFactResponse } from '../domain/chuck-norris-fact.response.model';

/**
 * method to apply markdown formatting on the provided string using provided formatting parameters
 *
 * @param markdownFormattingRequest string to format and parameters to apply
 */
export async function applyBasicMarkdownFormatting(markdownFormattingRequest: BasicMarkdownFormattingRequest): Promise<string> {
  try {
    let formattedString: string = applyParameterStyle(
      markdownFormattingRequest.text,
      markdownFormattingRequest.parameters.stringsToBold,
      '**'
    );
    formattedString = replaceParameterStrings(formattedString, markdownFormattingRequest.parameters.replacementPairs);

    formattedString = await addChuckNorrisFact(formattedString, markdownFormattingRequest.parameters.foodFacts);

    formattedString = addCharacterlimit(formattedString, markdownFormattingRequest.parameters.lineWidth);
    return formattedString;
  } catch (error) {
    console.error('[MarkdownService][applyBasicMarkdownFormatting]', error);
    throw new AppError(error.toString(), HttpResponseCode.INTERNAL_SERVER_ERROR);
  }
}

/**
 * method to apply specified style/format on the provided text
 *
 * @param text provided string to apply formatting on
 * @param keywords keywords provided based on which formatting is to be applied
 * @param style styling to be applied e.g '**' for bold
 */
function applyParameterStyle(text?: string, keywords?: Array<string>, style?: string): string {
  if (keywords == undefined || keywords.length == 0) return text;

  //regex expression to match any of the provided keywords
  const pattern = new RegExp(`(${keywords.join('|')})`, 'ig');

  text = text.replace(pattern, `${style}$1${style}`);

  return text;
}

/**
 * method to replace specified strings in the text with the ones provided
 *
 * @param text provided string to apply formatting on
 * @param keywords keywords provided based on which formatting is to be applied
 */
function replaceParameterStrings(text?: string, keywords?: Array<ReplacementPair>): string {
  if (keywords == undefined || keywords.length == 0) return text;



  keywords.forEach((element) => {
    text = text.replace(Object.keys(element)[0].toString(), element[Object.keys(element)[0]]);
  });

  return text;
}

/**
 * method to check if provided words exists in the test. If yes, then append a Chuch Norris fact at the end of that paragraph
 *
 * @param text provided string to apply formatting on
 * @param keywords keywords provided based on which formatting is to be applied
 */
async function addChuckNorrisFact(text?: string, keywords?: Array<string>): Promise<string> {
  if (keywords == undefined || keywords.length == 0) return text;

  const paragraphs: Array<string> = text.split('\n');
  let foodFact: string;

  //In order to  read the files in sequence, forEach cannot be used. reference: https://stackoverflow.com/a/37576787
  for (const element in paragraphs) {
    foodFact = '';
    if (keywords.some((keyword) => paragraphs[element].includes(keyword))) {
      const fact: ChuckNorrisFactResponse = await fetchChuckNorrisFacts();

      foodFact = fact.value.joke;
      paragraphs[element] = paragraphs[element] + '\n' + `${foodFact}` + '\n';
    }
  }
  return paragraphs.join('\n');
}

/**
 * method to apply specified line width to the provided text
 *
 * @param text provided string to apply formatting on
 * @param lineWidth width to limit lines to
 */
function addCharacterlimit(text?: string, lineWidth?: number): string {
  if (lineWidth == undefined) return text;

  const pattern = new RegExp(`(.{${lineWidth}})`, 'g');

  //$1 keeps a reference to the group selected
  return text.replace(pattern, '$1\n');
}

/**
 * method to get random Chuck Norris fact from API
 */
async function fetchChuckNorrisFacts(): Promise<ChuckNorrisFactResponse> {
  const response = await axios.get(CHUCK_NORRIS_API_ENDPOINT, {
    headers: {
      Accept: 'application/json',
    },
  });
  const fact: ChuckNorrisFactResponse = response.data;
  return fact;
}
