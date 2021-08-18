export function generateRandStr(length, type = 'mix') {
  let characters;
  if (type === 'mix') {
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  } else if (type === 'numeric') {
    characters = '0123456789';
  } else if (type === 'mixIgnoreCase') {
    characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789';
  }
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function naturalOrderBy(a, b) {
  return a.localeCompare(b, undefined, {
    numeric: true,
    sensitivity: 'base',
  });
}

export function Exception(boom, { message = null, description = 'No description' }) {
  if (message) {
    boom.output.payload.message = message;
  }
  boom.output.payload.description = description;
  return boom;
}
