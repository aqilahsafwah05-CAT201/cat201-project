const signUpBtn = document.getElementById("signup-button");
const profileBtn = document.getElementById("profile-button");
const cartBtn = document.getElementById("cart-button");
const isLoggedIn = true;

if(isLoggedIn){
    signUpBtn.style.display = 'none';
    profileBtn.style.display = 'inline-block';
    cartBtn.style.display = "inline-block";
}

const mainPage = document.getElementById("main-page");
const loginPage = document.getElementById("login-page");
const signUpPage = document.getElementById("sign-up-page");

signUpBtn.addEventListener("click",()=>{
    mainPage.style.display = 'none';
    signUpPage.style.display = 'flex';
})

const loginHover = document.getElementById("login-hover");

loginHover.addEventListener("click", () => {
    signUpPage.style.display = 'none';
    loginPage.style.display = 'flex';
})

const forgetPasswordMain = document.getElementById("forget-password-main-page");
const forgetPasswordCode = document.getElementById("forget-password-code-page");
const forgetPasswordBtn = document.getElementById("forget-password-login");
const requestCodeBtn = document.getElementById("request-code");
const verifyCodeBtn = document.getElementById("verify-code");

forgetPasswordBtn.addEventListener("click", () =>{
    loginPage.style.display = 'none';
    forgetPasswordMain.style.display = 'flex'; 
})

requestCodeBtn.addEventListener("click",() =>{
    forgetPasswordMain.style.display = 'none';
    forgetPasswordCode.style.display = 'flex';   
})

verifyCodeBtn.addEventListener("click", ()=>{
    forgetPasswordCode.style.display = 'none';
    mainPage.style.display = 'flex';      
})

const homeBtn = document.getElementById("home-button");
const contactBtn = document.getElementById("contact-button");
const aboutBtn = document.getElementById("about-button");
//profile button
//about button

const cartPage = document.getElementById("cart-page");

homeBtn.addEventListener("click", ()=>{
    showHomePage();
})

cartBtn.addEventListener("click", ()=>{
    showCartPage();
})

function showHomePage(){
    const pages = document.querySelectorAll(".page");
    pages.forEach(page=>{
        page.style.display = "none";
    })

    mainPage.style.display = "flex";
}

function showCartPage(){
    const pages = document.querySelectorAll(".page");
    pages.forEach(page=>{
        page.style.display = "none";
    })

    cartPage.style.display = "flex";
}

// Load cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render cart table
function renderCart() {
  const tbody = document.getElementById('cart-items');
  tbody.innerHTML = '';

  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    tbody.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>
          <input type="number" min="1" value="${item.quantity}"
            onchange="updateQuantity('${item.id}', this.value)">
        </td>
        <td>$${subtotal.toFixed(2)}</td>
        <td>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        </td>
      </tr>
    `;
  });

  updateTotals(total);
}

// Update quantity when input changes
function updateQuantity(id, qty) {
  const item = cart.find(p => p.id === id);
  if (item) {
    item.quantity = Number(qty);
    saveCart();
    renderCart();
  }
}

// Update subtotal and total
function updateTotals(subtotal) {
  document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById('total').textContent = `$${subtotal.toFixed(2)}`;
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to cart
function addToCart(id, name, price) {
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: id,
      name: name,
      price: price,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
}

// Render cart on page load
renderCart();

// Add event listeners to all add-to-cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function () {
    const product = this.closest('.products'); // matches your HTML

    if (!product) return; // safety check

    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = Number(product.dataset.price);

    addToCart(id, name, price);
  });
});

function removeFromCart(id) {
  // Filter out the item with this id
  cart = cart.filter(item => item.id !== id);

  // Save updated cart
  saveCart();

  // Re-render table
  renderCart();
}


const returnMain = document.getElementById("return-shop");

returnMain.addEventListener("click",()=>{
    cartPage.style.display = "none";
    mainPage.style.display = "flex";
})
