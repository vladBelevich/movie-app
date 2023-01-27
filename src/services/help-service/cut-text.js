function cutText(text, limit) {
  let newText = text.trim();
  if (newText.length <= limit) {
    return text;
  }
  newText = text.slice(0, limit);
  const lastSpace = newText.lastIndexOf(' ');
  if (lastSpace > 0) {
    newText = newText.slice(0, lastSpace);
  }

  return `${newText}...`;
}

export default cutText;
