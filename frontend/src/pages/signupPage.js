import { loginPage } from "./loginPage.js";
import "../styles/login.css"; // reuse login styles

export function signupPage() {
  webix.ui({
    id: "signupLayout",
    container: "app",
    rows: [
      { gravity: 1 },
      {
        cols: [
          { gravity: 1 },
          {
            view: "form",
            id: "signupForm",
            maxWidth: 450,
            padding: 20,
            borderless: true,
            elements: [
              {
                view: "template",
                template: "<h2 style='text-align:center;'>Register</h2>",
                type: "header",
                height: 60,
                borderless: true,
              },
              {
                view: "text",
                name: "firstname",
                label: "First Name",
                placeholder: "Bhashitha",
              },
              {
                view: "text",
                name: "lastname",
                label: "Last Name",
                placeholder: "Viduranga",
              },
              {
                view: "text",
                name: "email",
                label: "Email",
                placeholder: "user@example.com",
              },
              {
                view: "text",
                name: "password",
                label: "Password",
                type: "password",
              },
              {
                cols: [
                  {
                    view: "button",
                    value: "Register",
                    css: "webix_primary",
                    click: () => {
                      const form = $$("signupForm");
                      if (form.validate()) {
                        const values = form.getValues();
                        console.log("Registering user:", values);
                        webix.message("Registration successful!");
                        $$("signupLayout").destructor();
                        loginPage(); // redirect to login after signup
                      }
                    },
                  },
                  {
                    view: "button",
                    value: "Cancel",
                    click: () => {
                      $$("signupLayout").destructor();
                      loginPage(); // back to login
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
