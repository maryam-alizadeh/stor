import { setCookie } from "./utils/cookie.js";
import { postData } from "./utils/httpReq.js";
import authHandler from "./utils/authorization.js"
const InputsBox = document.querySelectorAll("input");
const LoginButton = document.querySelector("button");

const submitHandler = async (event) => {
  event.preventDefault();

  const username = InputsBox[0].value;
  const password = InputsBox[1].value;

  const response = await postData("auth/login", {
    username: username,
    password: password,
  });

  setCookie(response.token);
  location.assign("index.html");
};

const init = () => {
    authHandler()
};
LoginButton.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", init);
