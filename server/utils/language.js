const DEFAULT_LANGUAGE = 'id';

const resolveLanguage = (req) => {
  const param = (req.query.lang || '').toString().trim().toLowerCase();
  if (param) {
    return param;
  }
  const header = (req.headers['accept-language'] || '').toString();
  if (!header) {
    return DEFAULT_LANGUAGE;
  }
  return header.split(',')[0].trim().slice(0, 2).toLowerCase() || DEFAULT_LANGUAGE;
};

module.exports = {
  DEFAULT_LANGUAGE,
  resolveLanguage
};
