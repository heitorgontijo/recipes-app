export default (key, value) => {
  if (localStorage.getItem(key) === null) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
