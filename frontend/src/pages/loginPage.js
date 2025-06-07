import { settingsPage } from "./settings.js";
import { signupPage } from "./signupPage.js";
import "../styles/login.css";

const API_URL = import.meta.env.VITE_API_URL;

export function loginPage() {
  webix.ui({
    id: "loginLayout",
    container: "app",
    rows: [
      { gravity: 1 },
      {
        cols: [
          { gravity: 1 },
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
                name: "username",
                label: "username",
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
                click: async () => {
                  const form = $$("loginForm");
                  if (form.validate()) {
                    const values = form.getValues();
                    console.log("Login values:", values);

                    try {
                      const response = await fetch(
                        `${API_URL}/api/login/`,
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(values),
                        }
                      );

                      if (!response.ok) {
                        const errorData = await response.json();
                        webix.message({
                          type: "error",
                          text: errorData.detail || "Login failed",
                        });
                        return;
                      }

                      const data = await response.json();
                      const token = data.token || data.access; // depends on your backend
                      console.log("Received token:", token);

                      // Store token
                      localStorage.setItem("authToken", token);
                      webix.message("Login successful!");

                      // Proceed to settings page
                      $$("loginLayout").destructor();
                      webix.ui(settingsPage(), $$("app"));

                      // Call init functions if needed
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
                click: () => {
                  $$("loginLayout").destructor();
                  signupPage();
                },
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
