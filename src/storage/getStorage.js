export default (key, defaultValue) => (
  JSON.parse(localStorage.getItem(key)) || defaultValue
);
