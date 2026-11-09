const storageKey = 'qualityforge-demo-purchases';
const form = document.getElementById('purchase-form');
const results = document.getElementById('results');
const search = document.getElementById('search');
const count = document.getElementById('count');
const error = document.querySelector('[data-testid="form-error"]');
let purchases;
try { purchases = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (!Array.isArray(purchases)) purchases = []; }
catch { purchases = []; }
function render() {
  const query = search.value.trim().toLowerCase();
  count.textContent = `${purchases.length} ${purchases.length === 1 ? 'purchase' : 'purchases'}`;
  results.replaceChildren();
  const filtered = purchases.filter(p => `${p.name} ${p.brand}`.toLowerCase().includes(query));
  if (!filtered.length) { const empty = document.createElement('p'); empty.dataset.testid='empty-state'; empty.className='muted'; empty.textContent=query?'No matching purchases':'No purchases yet'; results.append(empty); return; }
  for (const p of filtered) {
    const card=document.createElement('article'); card.className='card'; card.dataset.testid='purchase-card';
    const title=document.createElement('strong');title.textContent=p.name;
    const brand=document.createElement('span');brand.textContent=`${p.brand} · ₹${p.price} · ${p.purchaseDate}`;
    card.append(title,brand); results.append(card);
  }
}
form.addEventListener('submit', event => {
  event.preventDefault(); error.textContent='';
  const name=document.getElementById('name').value.trim();
  const brand=document.getElementById('brand').value.trim();
  const price=Number(document.getElementById('price').value);
  const purchaseDate=document.getElementById('date').value;
  if (!name || !brand || !purchaseDate) {error.textContent='All fields are required';return;}
  if (!Number.isFinite(price) || price<=0) {error.textContent='Price must be greater than zero';return;}
  purchases.push({id:crypto.randomUUID(),name,brand,price:price.toFixed(2),purchaseDate});
  localStorage.setItem(storageKey,JSON.stringify(purchases));
  form.reset();render();
});
search.addEventListener('input',render);render();
