export function boxWithEditPermission(label, id, viewType = "text", options = [], labelWidth=100) {
    const field = {
    view: viewType,
    label: label,
    name: id,
    id: id,
    readonly: true,
    labelWidth: labelWidth,
  };

  if (viewType === "combo") {
    field.options = options;
  }
  return {
    cols: [
      field,
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

export function boxWithoutEditPermission(label, id, viewType = "text", options_val , labelWidth=100 ,inputWidth) {
    const field = {
    view: viewType,
    label: label,
    name: id,
    id: id,
    labelWidth: labelWidth,
  };

  if (viewType === "combo" || viewType === "select") {
    field.options = options_val;
  }
  if( viewType === "switch") {
    field.value = options_val; 
  }
  if (inputWidth) {
    field.inputWidth = labelWidth+inputWidth;
  }
  return {
    cols: [
      field,
    ]
  };
}


export function editpassword(label, id, labelWidth=150) {
  let passwordVisible = false;

  const field = {
    view: "text",
    type: "password",
    label: label,
    name: id,
    id: id,
    labelWidth: labelWidth,
  };

  const toggleButton = {
    view: "button",
    type: "icon",
    icon: "fas fa-eye",
    width: 40,
    css: "toggle-password-button",
    click: function () {
      passwordVisible = !passwordVisible;

      $$(id).define("type", passwordVisible ? "text" : "password");
      $$(id).refresh();

      this.define("icon", passwordVisible ? "fas fa-eye-slash" : "fas fa-eye");
      this.refresh();
    }
  };

  return {
    cols: [
      field,
      toggleButton
    ]
  };
}