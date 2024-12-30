export const useDivideIntoParagraphs = (inputText) => {
  if (!inputText) return null;
  const paragraphs = inputText.split('\n').filter((p) => p.trim() !== '');
  const outputText = paragraphs.map((p) => `<p>${p}</p>`).join('');
  return outputText;
};

export const useDivideIntoInputBr = (inputText) => {
  if (!inputText) return null;
  const formattedText = inputText.replace(/\n/g, '<br/>');
  return formattedText;
};
export const useDivideIntoInputText = (inputText) => {
  if (!inputText) return null;
  const formattedText = inputText
    .split('</p><p>')
    .join('\n')
    .replace('<p>', '')
    .replace('</p>', '')
    .replace('<br/>', '\n');

  return formattedText;
};
