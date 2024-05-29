const generateUniqueId = () => {
  const numbers = Math.floor(10000 + Math.random() * 90000); // Generates a number between 10000 and 99999
  const letters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) + String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Generates 2 random uppercase letters
  return numbers.toString() + letters; // Concatenate numbers and letters as a string
};

module.exports = {generateUniqueId}