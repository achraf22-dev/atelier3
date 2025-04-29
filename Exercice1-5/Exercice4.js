// Exercice4.js
const numbers = [1, 7, 10, 9, 8];
const max = numbers.reduce((m, n) => (n > m ? n : m), numbers[0]);

console.log(max);