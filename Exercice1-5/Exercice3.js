// Exercice3.js
const processText = text =>
    text
      .split('\n')
      .map(line => line.toUpperCase())
      .filter(line => line.includes('I'))
      .forEach(line => console.log(line));
  
  const input = `Ligne une
  ligne Deux
  invisible
  Visibilité
  fin`;
  processText(input);
  