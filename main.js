let products = [];

window.onload = function () {
  fetchProducts();
};

// Fetch all products
function fetchProducts() {
  fetch("https://dummyjson.com/products")
    .then(res => res.json())
    .then(data => {
      products = data.products;
      displayProducts(products);
    });
}

// Display products
function displayProducts(productList) {
  const container = document.getElementById("productContainer");
  container.innerHTML = "";
  productList.forEach(p => {
    container.innerHTML += `
      <div class="card">
        <img src="${p.thumbnail}" />
        <h3>${p.title}</h3>
        <p>Brand: ${p.brand}</p>
        <p>Price: $${p.price}</p>
        <p>Rating: ⭐${p.rating}</p>
      </div>
    `;
  });
}

// Search function with validation
function searchProduct() {
  const input = document.getElementById("searchInput").value.trim();
  if (input === "") {
    alert("Please enter a product name.");
    return;
  }

  fetch(`https://dummyjson.com/products/search?q=${input}`)
    .then(res => res.json())
    .then(data => {
      products = data.products;
      displayProducts(products);
    });
}

// Sorting function
function sortProducts() {
  const sortType = document.getElementById("sortSelect").value;
  let sorted = [...products];

  if (sortType === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortType === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortType === "rating-desc") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(sorted);
}

// Filter by brand (basic)
function filterProducts() {
  const brandText = document.getElementById("brandFilter").value.toLowerCase();
  const filtered = products.filter(p => p.brand.toLowerCase().includes(brandText));
  displayProducts(filtered);
}