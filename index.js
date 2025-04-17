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

  const searchHandler = () => {
    const query = inputBox.value.trim().toLowerCase();
    if (!query) showProducts(allProducts);
    const filterProducts = allProducts.filter((product) => product.title.toLowerCase().includes(query));
    showProducts(filterProducts);
  };
  const filterHandler = (event) => {
    const category = event.target.innerText.toLowerCase();
    listItems.forEach((li) => {
      if (li.innerText.toLowerCase() == category) {
        li.className = "selected";
      } else {
        li.className = "";
      }
    });
    if (category === "all") {
      return showProducts(allProducts);
    }
    const filteredProducts = allProducts.filter((product) => product.category.toLowerCase() === category);
    showProducts(filteredProducts);
  };

  listItems.forEach((li) => li.addEventListener("click", filterHandler));
  searchButton.addEventListener("click", searchHandler);
};

document.addEventListener("DOMContentLoaded", init);
