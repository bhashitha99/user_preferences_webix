import "../styles/settings.css";
import { isValidEmail } from "../utils/validations.js";
import { sendUpdate } from "../utils/api.js";

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

function editableField(label, id) {
  return {
    cols: [
      {
        view: "text",
        label: label,
        name: id,
        id: id,
        readonly: true,
      },
      {
        view: "button",
        type: "icon",
        icon: "fas fa-edit",
        width: 40,
        css: "edit_button",
        click: function () {
          webix.confirm({
            title: "Edit " + label,
            ok: "Yes",
            cancel: "No",
            text: `Do you want to edit ${label.toLowerCase()}?`,
            callback: function (result) {
              if (result) {
                $$(id).define("readonly", false);
                $$(id).refresh();
                $$(id).focus();
              }
            }
          });
        }
      }
    ]
  };
}

// 2. Create a reusable tabview
function createTabview() {
  return {
    view: "tabview",
    id: "mainTabview",
    cells: [
      {
        header: getTabHeader("fas fa-solid fa-user", "Account Settings"),
        body: {
          view: "form",
          id: "accountForm",
          elements: [
            {view: "template", template: "Profile Informations", type: "section", css: "section-header"},
            {cols:[
              { margin: 10,
                gravity: 3,
                rows:[
                editableField("First Name", "firstname"),
                editableField("Last Name", "lastname"),
                editableField("Email", "email")
              ]},
              {
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
            ]},
            {
              view: "button",
              value: "Save Changes",
              type: "form",
              css: "save-button",
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
            }
          ]
        },
      },
      {
        header: getTabHeader("fas fa-solid fa-bell", "Notification Settings"),
        body: { template: "Place for the form control" },
      },
      {
        header: getTabHeader("fas fa-solid fa-palette", "Theme Settings"),
        body: { template: "About the app" },
      },
      {
        header: getTabHeader("fas fa-solid fa-lock", "Privacy Settings"),
        body: { template: "About the app" },
      },
    ],
  };
}

// 3. Main layout
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

// 4. Handle resize (rebuild only tabview)
window.addEventListener("resize", () => {
  const parent = $$("mainTabview").getParentView();
  const index = parent.index($$("mainTabview"));
  parent.removeView("mainTabview"); // remove old
  parent.addView(createTabview(), index); // insert new at same position
  addplaceholders();
});




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

