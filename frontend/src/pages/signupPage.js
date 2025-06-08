import { loginPage } from "./loginPage.js";
import "../styles/login.css";
import { API_URL } from "../config/config.js";
import { isValidEmail,isValidPasswordRegistation } from "../utils/validations.js"; 


// Function to save form data
export async function saveFormRegistationData( ) {
  const form = $$("signupForm");
  const values = form.getValues();
  const payload = {
    firstname: values.firstname,
    lastname: values.lastname,
    email: values.email,
    password: values.password,
  };

  if (!isValidEmail(values)) {
    return Promise.reject("Invalid Email");
  }
  if (!isValidPasswordRegistation(values)) {
    return Promise.reject("Invalid password format. Password must be at least 8 characters.");
  }
    try {
      const response = await fetch(`${API_URL}/api/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup error:", errorData.email);
        webix.message({
          type: "error",
          text: errorData.email || "Registration failed.",
        });
        return;
      }
      webix.message("Registration successful! Please log in.");
      $$("signupLayout").destructor();
      loginPage();
    
  } catch (err) {
    console.error("Signup error:", err);
    webix.message({
      type: "error",
      text: "Server error. Please try again.",
    });
  }


  return response.json();
}



export function signupPage() {
  webix.ui({
    id: "signupLayout",
    container: "app",
    css: "login-background", // same background as login
    rows: [
      { gravity: 1 },
      {
        cols: [
          { gravity: 1 },
          {
            view: "form",
            id: "signupForm",
            width: 450,
            padding: 30,
            css: "login-form",
            borderless: true,
            elements: [
              {
                view: "template",
                template: `
                  <div class="form-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/3064/3064155.png" width="60" style="margin-bottom:10px;" />
                    <h2>Create Account</h2>
                    <p>Start your journey with us</p>
                  </div>
                `,
                borderless: true,
                height: 140,
              },
              {
                view: "text",
                name: "firstname",
                label: "",
                placeholder: "First Name",
                css: "form-input",
              },
              {
                view: "text",
                name: "lastname",
                label: "",
                placeholder: "Last Name",
                css: "form-input",
              },
              {
                view: "text",
                name: "email",
                label: "",
                placeholder: "Email",
                css: "form-input",
              },
              {
                view: "text",
                name: "password",
                label: "",
                type: "password",
                placeholder: "Password",
                css: "form-input",
              },
              {
                margin: 10,
                cols: [
                  {
                    view: "button",
                    value: "Register",
                    css: "webix_primary",
                    click: async () => {
                      saveFormRegistationData();
                    },
                  },
                  {
                    view: "button",
                    value: "Cancel",
                    css: "webix_secondary",
                    click: () => {
                      $$("signupLayout").destructor();
                      loginPage();
                    },
                  },
                ],
              },
            ],
            rules: {
              firstname: webix.rules.isNotEmpty,
              lastname: webix.rules.isNotEmpty,
              email: webix.rules.isEmail,
              password: webix.rules.isNotEmpty,
            },
          },
          { gravity: 1 },
        ],
      },
      { gravity: 1 },
    ],
  });
}
