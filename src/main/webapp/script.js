const signUpBtn = document.getElementById("signup-button");
const loginBtn = document.getElementById("login-button");
const profileBtn = document.getElementById("profile-button");
const cartBtn = document.getElementById("cart-button");
const logoutBtn = document.getElementById("logout-button");

// Change 'const' to 'var' so we can update it from main.jsp
var isLoggedIn = false; 

// Wrap the button logic in a function so we can call it anytime
function updateAuthUI() {
    if(isLoggedIn){
        signUpBtn.style.display = 'none';
        loginBtn.style.display = 'none';
        profileBtn.style.display = 'inline-block';
        cartBtn.style.display = "inline-block";
        logoutBtn.style.display = 'inline-block';
    } else {
        // Optional: Ensure the reverse happens if logged out
        signUpBtn.style.display = 'inline-block';
        loginBtn.style.display = 'inline-block';
        profileBtn.style.display = 'none';
        logoutBtn.style.display = 'none';
        // cartBtn.style.display = "none"; // Keep cart hidden if not logged in? Up to you.
    }
}

// Run it once on load
updateAuthUI();

const mainPage = document.getElementById("main-page");
const loginPage = document.getElementById("login-page");
const signUpPage = document.getElementById("sign-up-page");

const loginHover = document.getElementById("login-hover");


loginHover.addEventListener("click", () => {
    signUpPage.style.display = 'none';
    loginPage.scrollIntoView({ behavior: "smooth" });
    loginPage.style.display = 'flex';
})

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function(event){
    const password = document.getElementById("login-password").value;

    if(password.length < 8){
        alert("Password must be at least 8 characters");
        event.preventDefault(); // stop submission
    } 
});

const signUpForm = document.getElementById("sign-up-form");

signUpForm.addEventListener("submit", function(event){
    const password = document.getElementById("sign-up-password").value;

    if(password.length < 8){
        alert("Password must be at least 8 characters");
        event.preventDefault(); // stop submission
    } 
});

const forgetPasswordBtn = document.getElementById("forget-password-login");


forgetPasswordBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    alert("Forget password page not implemented for this assignment.");
})


const homeBtn = document.getElementById("home-button");
const contactBtn = document.getElementById("contact-button");
const aboutBtn = document.getElementById("about-button");

const cartPage = document.getElementById("cart-page");

homeBtn.addEventListener("click", ()=>{
    showHomePage();
})

cartBtn.addEventListener("click", ()=>{
    showCartPage();
})

signUpBtn.addEventListener("click",()=>{
  showSignUpPage();
})

loginBtn.addEventListener("click",()=>{
  showLogInPage();
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

function showSignUpPage(){
    const pages = document.querySelectorAll(".page");
    pages.forEach(page=>{
        page.style.display = "none";
    })

    signUpPage.style.display = "flex";
}


function showLogInPage(){
    const pages = document.querySelectorAll(".page");
    pages.forEach(page=>{
        page.style.display = "none";
    })

    loginPage.style.display = "flex";
}


// --- ADD TO CART LOGIC (THE FIX) ---
// Instead of using localStorage, we send the data to Java!
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const product = this.closest('.products');
        
        // Get data from HTML
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = product.dataset.price;

        // Redirect to main.jsp with query parameters (Let Java handle it)
        window.location.href = `main.jsp?action=add&id=${id}&name=${encodeURIComponent(name)}&price=${price}`;
    });
});

const returnMain = document.getElementById("return-shop");

returnMain.addEventListener("click",()=>{
    cartPage.style.display = "none";
    mainPage.style.display = "flex";
})

const squareBtn = document.getElementById("square-button");
const shawlBtn = document.getElementById("shawl-button");
const innerCapBtn = document.getElementById("innerCap-button");
const squarePage = document.getElementById("square-page");
const shawlPage = document.getElementById("shawl-page");
const innercapPage = document.getElementById("innercap-page");

squareBtn.addEventListener("click",()=>{
  mainPage.style.display = "none";
  squarePage.style.display = "flex";
})

shawlBtn.addEventListener("click", () =>{
  mainPage.style.display = "none";
  shawlPage.style.display = "flex";
})

innerCapBtn.addEventListener("click", ()=>{
  mainPage.style.display = "none";
  innercapPage.style.display = "flex";
})



const proceedCheckOutBtn = document.getElementById("proceed-checkout-button");
const checkOutPage = document.getElementById("checkout-page");

proceedCheckOutBtn.addEventListener("click",() =>{
  showCheckOutPage();
})

function showCheckOutPage(){
  const pages = document.querySelectorAll(".page");

  pages.forEach(page=>{
    page.style.display ="none";
  })

  checkOutPage.style.display = "flex";

}


const profilePage = document.getElementById("profile-page");

// Link the profile button to the function
profileBtn.addEventListener("click", () => {
    showProfilePage();
});

function showProfilePage() {
    const pages = document.querySelectorAll(".page");
    
    // Hide all other pages
    pages.forEach(page => {
        page.style.display = "none";
    });

    // Show the profile page
    profilePage.style.display = "flex";
}

//still cannot load waiting user
function processCheckout(totalAmount) {
    const params = new URLSearchParams({
        action: 'create',
        customer: 'Customer Name', // Get this from session/form
        amount: totalAmount
    });

    fetch("orders", { method: "POST", body: params })
        .then(() => alert("Checkout successful! Order is processing."));
}

// --- AUTO-OPEN CART ON RELOAD ---
// This checks if the URL has "?view=cart"
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('view') === 'cart') {
    showCartPage();
}
