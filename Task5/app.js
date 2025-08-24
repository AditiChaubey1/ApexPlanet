const products = [
  {id:1, name:"T-Shirt", category:"fashion", price:1200, img:"https://picsum.photos/200?1"},
  {id:2, name:"Smartphone", category:"electronics", price:15000, img:"https://picsum.photos/200?2"},
  {id:3, name:"Sofa", category:"home", price:8000, img:"https://picsum.photos/200?3"},
  {id:4, name:"Shoes", category:"fashion", price:2200, img:"https://picsum.photos/200?4"},
];

let cart = JSON.parse(localStorage.getItem("cart") || "[]");

function renderProducts(list){
  const catalog = document.getElementById("catalog");
  catalog.innerHTML = "";
  list.forEach(p=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h4>${p.name}</h4>
      <div class="price">₹${p.price}</div>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    catalog.appendChild(card);
  });
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI(){
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = cart.map(p => `<li>${p.name} - ₹${p.price}</li>`).join("");
  document.getElementById("cartBadge").textContent = cart.length;
  document.getElementById("cartTotal").textContent = "₹" + cart.reduce((a,b)=>a+b.price,0);
}

document.getElementById("cartBtn").onclick = ()=>{
  document.getElementById("cart").classList.add("open");
  document.getElementById("overlay").hidden = false;
};
document.getElementById("closeCart").onclick = ()=>{
  document.getElementById("cart").classList.remove("open");
  document.getElementById("overlay").hidden = true;
};
document.getElementById("overlay").onclick = ()=>{
  document.getElementById("cart").classList.remove("open");
  document.getElementById("overlay").hidden = true;
};

document.getElementById("priceInput").oninput = (e)=>{
  document.getElementById("priceLabel").textContent = e.target.value;
  filterProducts();
};
document.getElementById("search").oninput = filterProducts;
document.getElementById("sort").onchange = filterProducts;
document.getElementById("clear").onclick = ()=>{
  document.getElementById("search").value = "";
  const maxPriceInput = document.getElementById("priceInput").max;
  document.getElementById("priceInput").value = maxPriceInput;
  document.getElementById("priceLabel").textContent = maxPriceInput;
  document.getElementById("sort").value = "default";
  renderProducts(products);
};

function filterProducts(){
  let filtered = [...products];
  const searchVal = document.getElementById("search").value.toLowerCase();
  const maxPrice = +document.getElementById("priceInput").value;
  const sort = document.getElementById("sort").value;

  filtered = filtered.filter(p=>p.name.toLowerCase().includes(searchVal) && p.price <= maxPrice);
  if(sort==="price-asc") filtered.sort((a,b)=>a.price-b.price);
  if(sort==="price-desc") filtered.sort((a,b)=>b.price-a.price);
  
  renderProducts(filtered);
}

document.getElementById("contactForm").onsubmit = (e)=>{
  e.preventDefault();
  document.getElementById("formStatus").textContent = "Message sent successfully!";
  e.target.reset();
};

document.getElementById("year").textContent = new Date().getFullYear();

renderProducts(products);
updateCartUI();
