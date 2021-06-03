// formats the field into title format -> convert '_' to space and uppercase first character
export function formatFieldToTitle(field) {
  if (!field) {
    return "";
  } else if (!field.includes("_")) {
    return field[0].toUpperCase() + field.slice(1);
  }
  const words = field.split("_");
  var title = "";
  words.forEach((word) => {
    title = title + word[0].toUpperCase() + word.slice(1) + " ";
  });
  return title.trim();
}
