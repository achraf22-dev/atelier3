// Exercice1.js
const numbers = [1, 7, 10, 9, 8, 2];
const result = numbers
  .filter(n => n % 2 === 0)
  .sort((a, b) => a - b);

console.log(result);