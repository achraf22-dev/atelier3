// script.js
let data = [], chart;

document.getElementById('fileInput').addEventListener('change', e => {
  const reader = new FileReader();
  reader.onload = () => {
    data = JSON.parse(reader.result);
    initControls();
    updateDisplay();
  };
  reader.readAsText(e.target.files[0]);
});

function initControls() {
  const cats = [...new Set(data.map(p => p.category))];
  const sel = document.getElementById('categorySelect');
  sel.innerHTML = `<option value="">Toutes catégories</option>` +
                  cats.map(c => `<option value="${c}">${c}</option>`).join('');
  ['categorySelect','sortSelect','searchInput']
    .forEach(id => document.getElementById(id).addEventListener('input', updateDisplay));
}

function updateDisplay() {
  let filtered = data.slice();
  const cat  = document.getElementById('categorySelect').value;
  const term = document.getElementById('searchInput').value.toLowerCase();

  if (cat)  filtered = filtered.filter(p => p.category === cat);
  if (term) filtered = filtered.filter(p => p.name.toLowerCase().includes(term));

  filtered.sort((a,b) =>
    a[document.getElementById('sortSelect').value]
  - b[document.getElementById('sortSelect').value]
  );

  document.getElementById('tableBody').innerHTML = filtered
    .map(p => `<tr>
                 <td>${p.name}</td>
                 <td>${p.category}</td>
                 <td>${p.price}</td>
                 <td>${p.stock}</td>
               </tr>`)
    .join('');

  const total = filtered.reduce((sum, p) => sum + p.price, 0);

  const low = data.filter(p => p.stock < 5).map(p => p.name).join(', ');
  document.getElementById('summary').textContent =
    `Prix total (sélection) : ${total.toFixed(2)} €\n` +
    `Produits faible stock (<5) : ${low}`;

  const ctx = document.getElementById('chart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: filtered.map(p => p.name),
      datasets: [{ label: 'Stock', data: filtered.map(p => p.stock) }]
    }
  });
}
