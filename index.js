import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { shortenText } from "./utils/stringFunction.js";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const inputBox = document.querySelector("input");
const searchButton = document.querySelector("button");
const listItems = document.querySelectorAll("li");

let allProducts;
let search = "";
let category = "all";

const showProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((product) => {
    const Jsx = `
        <div>
        <img src=${product.image} alt=${product.title} />
        <h4>${shortenText(product.title)}</h4>
        <div id="price"> 
        <p>$ ${product.price}</p>
        <button>
        Buy
        <i class="fa-solid fa-cart-shopping"></i>
        </button>
        </div>
        <div id="rate">
        <i class="fa-solid fa-star"></i>
        <span>${product.rating.rate}</span>
        </div>

        <div id="count">
        <i class="fa-solid fa-user"></i>
        <span>${product.rating.count}</span>
        </div>
        </div>
        `;
    mainContent.innerHTML += Jsx;
  });
};

const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }

  allProducts = await getData("products");
  showProducts(allProducts);

  const filterProducts = () => {
    const filteredProducts = allProducts.filter((product) => {
      if (category === "all") {
        return product.title.toLowerCase().includes(search);
      } else {
        return product.title.toLowerCase().includes(search) && product.category.toLowerCase() === category;
      }
    });
    showProducts(filteredProducts);
  };

  const searchHandler = () => {
    search = inputBox.value.trim().toLowerCase();
    filterProducts();
  };
  const filterHandler = (event) => {
    category = event.target.innerText.toLowerCase();

    listItems.forEach((li) => {
      if (li.innerText.toLowerCase() == category) {
        li.className = "selected";
      } else {
        li.className = "";
      }
    });
    filterProducts();
  };

  listItems.forEach((li) => li.addEventListener("click", filterHandler));
  searchButton.addEventListener("click", searchHandler);
};

document.addEventListener("DOMContentLoaded", init);
