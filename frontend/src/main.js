webix.ui({
  container: "app",
  rows: [
    { view: "template", type: "header", template: "User Preferences" },
    {
      view: "form",
      elements: [
        { view: "text", label: "Username", name: "username" },
        { view: "text", label: "Email", name: "email" },
        { view: "button", value: "Save", css: "webix_primary" },
      ]
    }
  ]
});
