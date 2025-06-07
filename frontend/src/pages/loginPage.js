import { settingsPage } from "./settings.js";
import { signupPage } from "./signupPage.js";
import "../styles/login.css";

export function loginPage() {
  webix.ui({
    id: "loginLayout",
    container: "app",
    rows: [
      { gravity: 1 }, // Top spacer
      {
        cols: [
          { gravity: 1 }, // Left spacer
          {
            view: "form",
            id: "loginForm",
            maxWidth: 400,
            padding: 20,
            borderless: true,
            elements: [
              {
                view: "template",
                template: "<h2 style='text-align:center;'>Login</h2>",
                type: "header",
                height: 60,
                borderless: true,
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
                view: "button",
                value: "Login",
                css: "webix_primary",
                click: () => {
                  const form = $$("loginForm");
                  if (form.validate()) {
                    const values = form.getValues();
                    console.log("Logging in with:", values);
                    webix.message("Login successful!");
                    $$("loginLayout").destructor();
                    webix.ui(settingsPage(), $$("app"));
                    webix.once(() => {
                      addplaceholders();
                      setInitialValues();
                    });
                  }
                },
              },
              {
                view: "button",
                value: "Sign Up",
                click: () => {
                  $$("loginLayout").destructor();
                  signupPage();
                },
              },
            ],
            rules: {
              email: webix.rules.isEmail,
              password: webix.rules.isNotEmpty,
            },
          },
          { gravity: 1 }, // Right spacer
        ],
      },
      { gravity: 1 }, // Bottom spacer
    ],
  });
}
