/* Parameters */
const HTML_ENTRY = 'index.html';

interface ResponseProps {
  point: number;
};


const __getResponseProps = (): ResponseProps => {
  return {
    point: 12,
  };
};


const doGet = (
    e: GoogleAppsScript.Events.AppsScriptHttpRequestEvent,
): GoogleAppsScript.HTML.HtmlOutput => {
  /* create html template */
  const template = HtmlService.createTemplateFromFile(HTML_ENTRY);
  const props: ResponseProps = __getResponseProps();
  template.props = props;

  const response = template.evaluate();
  return response;
};


// eslint-disable-next-line no-unused-vars
const __GAS_PROCEDURES = {
  doGet,
};
