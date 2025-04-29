// Exercice5.js
const products = [
    { name: "Shirt", price: 20 },
    { name: "Shoes", price: 50 },
    { name: "Hat",   price: 15 }
  ];
  
  const totalTTC = products
    .map(p => p.price * 1.25)
    .reduce((sum, p) => sum + p, 0);
  
  console.log(`Total TTC: ${totalTTC.toFixed(2)} €`);   