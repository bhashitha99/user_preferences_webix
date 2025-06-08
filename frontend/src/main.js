import { signupPage } from "./pages/signupPage.js";
import { loginPage } from "./pages/loginPage.js";


const themeLink = document.getElementById("webix-theme");
themeLink.href = "https://cdn.webix.com/edge/skins/material.css";
webix.skin.set("flat");

webix.ready(() => {
  const page = window.location.hash.slice(1); 

  if (page === "signup") {
    signupPage();
  } else {
    loginPage();
  }
});