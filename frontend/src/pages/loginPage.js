import { settingsPage } from "./settings.js";
import { signupPage } from "./signupPage.js";
import "../styles/login.css";
import { loadSavedThemeSettings } from "../pages/themeSettingsTab.js";

const API_URL = import.meta.env.VITE_API_URL;

export function loginPage() {
  webix.ui({
    id: "loginLayout",
    container: "app",
    css: "login-background",
    rows: [
      { gravity: 1 },
      {
        cols: [
          { gravity: 1 },
          {
            view: "form",
            id: "loginForm",
            width: 400,
            padding: 30,
            css: "login-form",
            borderless: true,
            elements: [
              {
                view: "template",
                template: `
                  <div class="form-header">
                    <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" width="60" style="margin-bottom:10px;" />
                    <h2>Welcome Back</h2>
                    <p>Please sign in to your account</p>
                  </div>
                `,
                borderless: true,
                height: 140,
              },
              {
                view: "text",
                name: "username",
                label: "",
                
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
                    value: "Login",
                    css: "webix_primary",
                    hotkey: "enter",
                    click: async () => {
                      const form = $$("loginForm");
                      if (form.validate()) {
                        const values = form.getValues();
                        try {
                          const response = await fetch(`${API_URL}/api/login/`, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify(values),
                          });

                          if (!response.ok) {
                            const errorData = await response.json();
                            webix.message({
                              type: "error",
                              text: errorData.detail || "Username or password is incorrect.",
                            });
                            return;
                          }

                          const data = await response.json();
                          const token = data.token || data.access;
                          localStorage.setItem("authToken", token);
                          webix.message("Login successful!");

                          $$("loginLayout").destructor();
                          webix.ui(settingsPage(), $$("app"));
                          loadSavedThemeSettings();
                          webix.once(() => {
                            addplaceholders?.();
                            setInitialValues?.();
                          });
                        } catch (err) {
                          console.error("Login error:", err);
                          webix.message({
                            type: "error",
                            text: "Server error. Please try again.",
                          });
                        }
                      }
                    },
                  },
                  {
                    view: "button",
                    value: "Sign Up",
                    css: "webix_secondary",
                    click: () => {
                      $$("loginLayout").destructor();
                      signupPage();
                    },
                  },
                ],
              },
            ],
            rules: {
              username: webix.rules.isEmail,
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
