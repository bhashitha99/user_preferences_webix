import "../styles/settings.css";
import { sendUpdate } from "../utils/api.js";
import { isValidPassword, isValidEmail } from "../utils/validations.js";
import { boxWithEditPermission,boxWithoutEditPermission,editpassword } from "../components/formFields.js";

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



export function getProfileSettingsTab() {
    return{
        header: getTabHeader("fas fa-solid fa-user", "Account Settings"),
        body: {
          view: "form",
          scroll: "y",
          id: "accountForm",
          elements: [
            {rows:[
              {margin: 10,
                view: "template",
                template: "Profile Informations",
                type: "section",
                css: "section-header",
                
              },
              { 
                margin: 10,
                ...responsiveLayout([
                { margin: 20,
                  gravity: 18,
                  rows:[
                  boxWithEditPermission("First Name", "firstname"),
                  boxWithEditPermission("Last Name", "lastname"),
                  boxWithEditPermission("Email", "email")
                ]},{},
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
                      height: 170
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
                            const imgEl = document.getElementById("profileImage");
                            imgEl.src = e.target.result; // Show preview
                          };
                          reader.readAsDataURL(upload.file);
                          return false; // stop actual upload
                        }
                      }
                    },
                    
                  ]
                },
                {}
              ])},
              {margin: 10,
                view: "template",
                template: "Personal Informations",
                type: "section",
                css: "section-header",
                
              },
              { margin: 20,
                ...responsiveLayout([
                {
                  margin: 20,
                  rows:[
                    boxWithEditPermission("Phone No", "phone"),
                    boxWithEditPermission("Marital Status", "maritalStatus", "combo", [
                      "single", "married", "divorced", "separated", "widowed","other"
                    ]),
                    boxWithEditPermission("Gender", "gender", "combo", [
                      "Male","Female","Other"
                    ]),
                    boxWithEditPermission("Job", "job"),

                  ]
                },
                { margin: 20,
                  rows:[
                  boxWithEditPermission("Address", "address"),
                  boxWithEditPermission("City", "city"),
                  boxWithEditPermission("Country", "country", "combo", [
                    "Sri Lanka", "India", "United States", "United Kingdom", "Germany"
                  ]),
                  boxWithEditPermission("Birthday", "birthday", "datepicker"),
                ]}
              ])},
              {margin: 20,
                view: "button",
                value: "Save Changes",
                type: "form",
                css: "webix_primary save-button",
                click: function () {
                saveFormData("accountForm", "http://localhost:8000/api/user/update", isValidEmail)
                  .then(() => {
                    webix.message("Changes saved successfully!");
                  })
                  .catch(err => {
                    if (err !== "Validation failed") {
                      webix.message({ type: "error", text: "Failed to save changes: " + err });
                    }
                  });
                }
              },

              {margin: 10,
                view: "template",
                template: "Change Password",
                type: "section",
                css: "section-header",
                
              },
              { margin: 20,
                ...responsiveLayout([  
                {
                  margin: 20,
                  rows:[
                    editpassword("Old Password", "oldPassword" )
                  ]
                },
                { margin: 20,
                  rows:[
                  editpassword("New Password", "newPassword" ),
                  editpassword("Confirm Password", "confirmPassword"),
                ]}
              ])},
              {margin: 20,
                view: "button",
                value: "Change the password",
                type: "form",
                css: "webix_primary save-button",
                click: function () {
                saveFormData("accountForm", "http://localhost:8000/api/user/update", isValidPassword)
                  .then(() => {
                    webix.message("Password changed successfully!");
                  })
                  .catch(err => {
                    if (err !== "Validation failed") {
                      webix.message({ type: "error", text: "Failed to save changes: " + err });
                    }
                  });
                }
              },
              {
                height: 100,
              },
            ]},
          ]
        },
      }
}