

import { signupPage } from "./pages/signupPage.js";
import { loginPage } from "./pages/loginPage.js";

webix.ready(() => {
  const page = window.location.hash.slice(1); // e.g., #signup

  if (page === "signup") {
    signupPage();
  } else {
    loginPage();
  }
});


// webix.ready(function () {
//   // Render settings page UI inside container "app"
//   webix.ui(settingsPage(), $$("app"));

//   // Wait for UI rendering to complete, then run your setup functions
//   webix.once(() => {
//     addplaceholders();
//     setInitialValues();
//   });
// });
