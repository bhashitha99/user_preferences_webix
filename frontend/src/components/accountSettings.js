import "../styles/settings.css";
import { isValidEmail } from "../utils/validations.js";
import { sendUpdate } from "../utils/api.js";
import { isValidPassword } from "../utils/validations.js";
import { boxWithEditPermission } from "../components/boxWithEditPermission.js";
import { boxWithoutEditPermission } from "../components/boxWithoutEditPermission.js";

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





// reusable password field with toggle visibility
function editpassword(label, id) {
  let passwordVisible = false;

  const field = {
    view: "text",
    type: "password",
    label: label,
    name: id,
    id: id,
  };

  const toggleButton = {
    view: "button",
    type: "icon",
    icon: "fas fa-eye",
    width: 40,
    css: "toggle-password-button",
    click: function () {
      passwordVisible = !passwordVisible;

      $$(id).define("type", passwordVisible ? "text" : "password");
      $$(id).refresh();

      this.define("icon", passwordVisible ? "fas fa-eye-slash" : "fas fa-eye");
      this.refresh();
    }
  };

  return {
    cols: [
      field,
      toggleButton
    ]
  };
}


