const products = [
  { name: "Smartphone", category: "electronics", price: 799, rating: 4.5 },
  { name: "T-shirt", category: "clothing", price: 299, rating: 4.2 },
  { name: "Laptop", category: "electronics", price: 1200, rating: 4.8 },
  { name: "Jeans", category: "clothing", price: 599, rating: 4.1 },
  { name: "Novel", category: "books", price: 199, rating: 4.7 },
  { name: "Tablet", category: "electronics", price: 499, rating: 4.0 },
  { name: "Jacket", category: "clothing", price: 899, rating: 4.6 },
  { name: "Biography", category: "books", price: 399, rating: 3.9 }
];

const categorySelect = document.getElementById("category");
const priceRange = document.getElementById("price");
const priceValue = document.getElementById("price-value");
const sortSelect = document.getElementById("sort");
const productList = document.getElementById("product-list");

function renderProducts(filtered) {
  productList.innerHTML = "";

  if (filtered.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p class="price">₹${product.price}</p>
      <p>Rating: ⭐ ${product.rating}</p>
    `;

    productList.appendChild(card);
  });
}

function filterAndSort() {
  let filtered = [...products];

  const selectedCategory = categorySelect.value;
  const maxPrice = parseInt(priceRange.value);
  const sortValue = sortSelect.value;

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  filtered = filtered.filter(p => p.price <= maxPrice);

  if (sortValue === "high") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortValue === "low") {
    filtered.sort((a, b) => a.rating - b.rating);
  }

  renderProducts(filtered);
}

categorySelect.addEventListener("change", filterAndSort);
priceRange.addEventListener("input", () => {
  priceValue.textContent = priceRange.value;
  filterAndSort();
});
sortSelect.addEventListener("change", filterAndSort);

// Initial Render
renderProducts(products);
