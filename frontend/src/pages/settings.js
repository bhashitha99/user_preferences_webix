import "../styles/settings.css";

// 1. Utility functions
function addplaceholders(){
  $$("firstname").define("placeholder", "Bhashitha");
  $$("firstname").refresh();
  $$("lastname").define("placeholder", "Viduranga");
  $$("lastname").refresh();
  $$("email").define("placeholder", "Bhashitha@gmail.com");
  $$("email").refresh();
}

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
            editableField("First Name", "firstname"),
            editableField("Last Name", "lastname"),
            editableField("Email", "email")
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

