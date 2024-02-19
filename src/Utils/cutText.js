export const cutText = (text, maxLength) => {
  return text.length > maxLength ? text.slice(0, maxLength) +'...' : text;
}