const cleanTheString = (input) => {
  const cleaned = input.replace(/[^a-zA-Z]/g, "").toLowerCase();
  return cleaned;
};

module.exports = {
  cleanTheString,
};
