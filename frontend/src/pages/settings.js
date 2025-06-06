import "../styles/settings.css";
import { sendUpdate } from "../utils/api.js";
import { isValidPassword, isValidEmail } from "../utils/validations.js";
import { boxWithEditPermission,boxWithoutEditPermission,editpassword } from "../components/formFields.js";
import {getProfileSettingsTab} from "./profileSettingsTab.js";
import {getNotificationSettingsTab} from "./notificationSettingsTab.js";
import {getPrivacySettingsTab} from "./privacySettingsTab.js";

// //////////////////////////////////////////////////////////////////
// 1. Utility functions
function addplaceholders(){
  $$("firstname").define("placeholder", "Bhashitha");
  $$("firstname").refresh();
  $$("lastname").define("placeholder", "Viduranga");
  $$("lastname").refresh();
  $$("email").define("placeholder", "Bhashitha@gmail.com");
  $$("email").refresh();
}

function setInitialValues() {
  $$("firstname").setValue("Bhashitha");
  $$("lastname").setValue("Viduranga");
  $$("email").setValue("Bhashitha@gmail.com");

  $$("firstname").define("readonly", true);
  $$("lastname").define("readonly", true);
  $$("email").define("readonly", true);
}
/////////////////////////////////////////////////////////////////////

function isMobile() {
  return window.innerWidth < 768;
}

function getTabHeader(iconClass, label) {
  if (isMobile()) {
    return `<span class='webix_icon ${iconClass}'></span>`;
  } else {
    return `<span class='webix_icon ${iconClass}'></span> ${label}`;
  }
}

export async function saveFormData(formId, url, validateFn) {
  const form = $$(formId);
  const values = form.getValues();
  console.log("Form values to save:", values);
  // Validate if validation function is provided
  if (validateFn && !validateFn(values)) {
    return Promise.reject("Validation failed");
  }
  // Send the data to backend
  return sendUpdate(url, values);
}

//  Create a reusable tabview
function createTabview() {
  return {
    view: "tabview",
    id: "mainTabview",
    cells: [
      getPrivacySettingsTab(),
      getProfileSettingsTab(),
      getNotificationSettingsTab(),
      {
        header: getTabHeader("fas fa-solid fa-palette", "Theme Settings"),
        body: { template: "About the app" },
      },
    ],
  };
}

// Main layout
webix.ui({
  cols: [
    {
      rows: [
        createTabview() // insert the tabview initially
      ]
    }
  ]
});
addplaceholders();
setInitialValues();

// Handle resize (rebuild only tabview)
window.addEventListener("resize", () => {
  const parent = $$("mainTabview").getParentView();
  const index = parent.index($$("mainTabview"));
  parent.removeView("mainTabview"); // remove old
  parent.addView(createTabview(), index); // insert new at same position
  addplaceholders();
});

// // Responsive layout
// function responsiveLayout(items) {
//   return isMobile() ? { rows: items } : { cols: items };
// }




// Load user data
// fetch("http://localhost:8000/api/user")
//   .then(response => response.json())
//   .then(data => {
//     $$("firstname").define("placeholder", data.firstName);
//     $$("lastname").define("placeholder", data.lastName);
//     $$("email").define("placeholder", data.email);
//     $$("firstname").refresh();
//     $$("lastname").refresh();
//     $$("email").refresh();
//   });

// Hardcoded fallback

