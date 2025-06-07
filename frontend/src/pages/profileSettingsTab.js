import "../styles/settings.css";
import { sendUpdate } from "../utils/api.js";
import { isValidPassword, isValidEmail } from "../utils/validations.js";
import {
  boxWithEditPermission,
  boxWithoutEditPermission,
  editpassword,
} from "../components/formFields.js";

const API_URL = import.meta.env.VITE_API_URL;

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

// Responsive layout
function responsiveLayout(items) {
  return isMobile() ? { rows: items } : { cols: items };
}

// Function to save form data
export async function saveFormData(formId, url, validateFn) {
  const form = $$(formId);
  const values = form.getValues();
  const token = localStorage.getItem("authToken");

  // Format birthday
  if (values.birthday instanceof Date) {
    const yyyy = values.birthday.getFullYear();
    const mm = String(values.birthday.getMonth() + 1).padStart(2, "0");
    const dd = String(values.birthday.getDate()).padStart(2, "0");
    values.birthday = `${yyyy}-${mm}-${dd}`;
  }

  console.log("Form values to save:", values);

  if (validateFn && !validateFn(values)) {
    return Promise.reject("Validation failed");
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    const errText = await response.text();
    return Promise.reject(errText || "Failed to save data");
  }

  return response.json();
}

//change password function
export async function changePassword(
  url,
  oldPassword,
  newPassword,
  confirmPassword,
  validateFn
) {
  const values = { oldPassword, newPassword, confirmPassword };
  const token = localStorage.getItem("authToken");

  if (validateFn && !validateFn(values)) {
    return Promise.reject("Validation failed");
  }

  if (newPassword !== confirmPassword) {
    webix.message({ type: "error", text: "Passwords do not match" });
    return Promise.reject("Passwords do not match");
  }

  const payload = {
    oldPassword,
    newPassword,
    confirmPassword,
  };

  const response = await fetch(url, {
    method: "POST", // or PUT depending on backend
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errText = await response.text();
    return Promise.reject(errText || "Password change failed");
  }

  return response.json();
}

export function getProfileSettingsTab() {
  return {
    header: getTabHeader("fas fa-solid fa-user", "Account Settings"),
    body: {
      view: "form",
      scroll: "y",
      id: "accountForm",
      elements: [
        {
          rows: [
            {
              margin: 10,
              view: "template",
              template: "Profile Informations",
              type: "section",
              css: "section-header",
            },
            {
              margin: 10,
              ...responsiveLayout([
                {
                  margin: 20,
                  gravity: 18,
                  rows: [
                    boxWithEditPermission("First Name", "firstname"),
                    boxWithEditPermission("Last Name", "lastname"),
                    boxWithEditPermission("Email", "email"),
                  ],
                },
                {},
                {
                  gravity: 6,
                  rows: [
                    {
                      margin: 10,
                      view: "template",
                      id: "imagePreview",
                      template: `
                        <div class="profile-picture-container">
                          <img class="profile-picture" id="profileImage" src="src/assets/img/user.jpg" alt="Profile Picture">
                        </div>
                      `,
                      height: 170,
                    },
                    {
                      view: "uploader",
                      value: "Change Photo",
                      name: "photo",
                      accept: "image/png, image/jpeg",
                      autosend: false, // disable auto-upload
                      on: {
                        onBeforeFileAdd: function (upload) {
                          const reader = new FileReader();
                          reader.onload = function (e) {
                            const imgEl =
                              document.getElementById("profileImage");
                            imgEl.src = e.target.result; // Show preview
                          };
                          reader.readAsDataURL(upload.file);
                          return false; // stop actual upload
                        },
                      },
                    },
                  ],
                },
                {},
              ]),
            },
            {
              margin: 10,
              view: "template",
              template: "Personal Informations",
              type: "section",
              css: "section-header",
            },
            {
              margin: 20,
              ...responsiveLayout([
                {
                  margin: 20,
                  rows: [
                    boxWithEditPermission("Phone No", "phone"),
                    boxWithEditPermission(
                      "Marital Status",
                      "maritalstatus",
                      "combo",
                      [
                        "single",
                        "married",
                        "divorced",
                        "separated",
                        "widowed",
                        "other",
                      ]
                    ),
                    boxWithEditPermission("Gender", "gender", "combo", [
                      "Male",
                      "Female",
                      "Other",
                    ]),
                    boxWithEditPermission("Job", "job"),
                  ],
                },
                {
                  margin: 20,
                  rows: [
                    boxWithEditPermission("Address", "address"),
                    boxWithEditPermission("City", "city"),
                    boxWithEditPermission("Country", "country", "combo", [
                      "Sri Lanka",
                      "India",
                      "United States",
                      "United Kingdom",
                      "Germany",
                    ]),
                    boxWithEditPermission("Birthday", "birthday", "datepicker"),
                  ],
                },
              ]),
            },
            {
              margin: 20,
              view: "button",
              value: "Save Changes",
              type: "form",
              css: "webix_primary save-button",
              click: function () {
                saveFormData(
                  "accountForm",
                  `${API_URL}/api/profile/?=`,
                  isValidEmail
                )
                  .then(() => {
                    webix.message("Changes saved successfully!");
                  })
                  .catch((err) => {
                    if (err !== "Validation failed") {
                      webix.message({
                        type: "error",
                        text: "Failed to save changes: " + err,
                      });
                    }
                  });
              },
            },

            {
              margin: 10,
              view: "template",
              template: "Change Password",
              type: "section",
              css: "section-header",
            },
            {
              margin: 20,
              ...responsiveLayout([
                {
                  margin: 20,
                  rows: [editpassword("Old Password", "oldPassword")],
                },
                {
                  margin: 20,
                  rows: [
                    editpassword("New Password", "newPassword"),
                    editpassword("Confirm Password", "confirmPassword"),
                  ],
                },
              ]),
            },
            {
              margin: 20,
              view: "button",
              value: "Change the password",
              type: "form",
              css: "webix_primary save-button",
              click: function () {
                const values = $$("accountForm").getValues();
                const { oldPassword, newPassword, confirmPassword } = values;
                changePassword(
                  `${API_URL}/api/change-password/`,
                  oldPassword,
                  newPassword,
                  confirmPassword,
                  isValidPassword
                )
                  .then(() => {
                    webix.message("Password changed successfully!");
                  })
                  .catch((err) => {
                    if (err !== "Validation failed") {
                      webix.message({ text: "Old password is incorrect." });
                    }
                  });
                $$("oldPassword").setValue("");
                $$("newPassword").setValue("");
                $$("confirmPassword").setValue("");
              },
            },
            {
              height: 100,
            },
          ],
        },
      ],
    },
  };
}
