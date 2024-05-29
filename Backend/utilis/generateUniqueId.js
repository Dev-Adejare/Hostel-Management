// Function to Generate an ID with 5 numbers and 2 letters

const generaUniqueId = () => {
  const number = Math.floor(10000 + Math.random() * 90000);
  const letter =
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(65 + Math.floor(Math.random() * 26));
};
