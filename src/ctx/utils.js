// eslint-disable-next-line @typescript-eslint/no-unused-vars
function parseElement(text) {
  return text.replace(/<span[^>]*>(.*?)<\/span>/g, "$1");
}
