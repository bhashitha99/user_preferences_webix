import "../styles/settings.css";
import { sendUpdate } from "../utils/api.js";
import {
  boxWithEditPermission,
  boxWithoutEditPermission,
  editpassword,
} from "../components/formFields.js";

function isMobile() {
  return window.innerWidth < 768;
}

function responsiveLayout(items) {
  return isMobile() ? { rows: items } : { cols: items };
}

function getTabHeader(iconClass, label) {
  if (isMobile()) {
    return `<span class='webix_icon ${iconClass}'></span>`;
  } else {
    return `<span class='webix_icon ${iconClass}'></span> ${label}`;
  }
}

function changeFontSize(size) {
  document.documentElement.style.setProperty("--user-font-size", size);
}
function changeFontFamily(fontName) {
  document.documentElement.style.setProperty("--user-font-family", fontName);
}


function switchTheme(themeName) {
  const themeLink = document.getElementById("webix-theme");
  themeLink.href = `https://cdn.webix.com/edge/skins/${themeName}.css`;

  // Also update skin if needed (optional for Webix v8+)
  webix.skin.set(themeName);
}

export function getThemeSettingsTab() {
  return {
    header: getTabHeader("fas fa-solid fa-palette", "Theme Settings"),
    body: {
      view: "form",
      scroll: "y",
      id: "themeForm",
      elements: [
        {
          rows: [
            {
              margin: 10,
              view: "template",
              template: "Theme Settings",
              type: "section",
              css: "section-header",
            },
            {
              margin: 10,
              rows: [
                {
                  ...responsiveLayout([
                    {
                      view: "template",
                      type: "clean",
                      template: "Theme Color",
                      height: 50,
                      css: "theme-label",
                    },
                    {
                      view: "template",
                      template: `<div class="theme-card flat">Flat</div>`,
                      css: "theme-select",
                      height: 50,
                      borderless: true,
                      onClick: {
                        "theme-card": function () {
                          switchTheme("flat");
                        },
                      },
                    },
                    {
                      view: "template",
                      template: `<div class="theme-card material">Material</div>`,
                      css: "theme-select",
                      height: 50,
                      borderless: true,
                      onClick: {
                        "theme-card": function () {
                          switchTheme("material");
                        },
                      },
                    },
                    {
                      view: "template",
                      template: `<div class="theme-card contrast">Contrast</div>`,
                      css: "theme-select",
                      height: 50,
                      borderless: true,
                      onClick: {
                        "theme-card": function () {
                          switchTheme("contrast");
                        },
                      },
                    },
                    {
                      view: "template",
                      template: `<div class="theme-card dark">Dark</div>`,
                      css: "theme-select",
                      height: 60,
                      borderless: true,
                      onClick: {
                        "theme-card": function () {
                          switchTheme("dark");
                        },
                      },
                    },
                  ]),
                },
                {
                  ...responsiveLayout([
                    {
                      margin: 10,
                      view: "template",
                      type: "clean",
                      template: "Font Size",
                      height: 50,
                      css: "font-label",
                    },
                    {
                      view: "template",
                      template: `<div class="font-card-small">Small</div>`,
                      borderless: true,
                      height: 50,
                      onClick: {
                        "font-card-small": function () {
                          changeFontSize("14px");
                        },
                      },
                    },
                    {
                      view: "template",
                      template: `<div class="font-card-medium">Medium</div>`,
                      borderless: true,
                      height: 50,
                      onClick: {
                        "font-card-medium": function () {
                          changeFontSize("16px");
                        },
                      },
                    },
                    {
                      view: "template",
                      template: `<div class="font-card-large">Large</div>`,
                      borderless: true,
                      height: 50,
                      onClick: {
                        "font-card-large": function () {
                          changeFontSize("18px");
                        },
                      },
                    },
                  ]),
                },
                {
                  ...responsiveLayout([
                    {
                      view: "template",
                      type: "clean",
                      template: "Font Family",
                      height: 50,
                      css: "font-label",
                    },
                    {
                      view: "template",
                      template: `<div class="font-card-arial">Arial</div>`,
                      borderless: true,
                      height: 50,
                      onClick: {
                        "font-card-arial": function () {
                          changeFontFamily("Arial");
                        },
                      },
                    },
                    {
                      view: "template",
                      template: `<div class="font-card-roboto">Roboto</div>`,
                      borderless: true,
                      height: 50,
                      onClick: {
                        "font-card-roboto": function () {
                          changeFontFamily("Roboto, sans-serif");
                        },
                      },
                    },
                    {
                      view: "template",
                      template: `<div class="font-card-monospace">Monospace</div>`,
                      borderless: true,
                      height: 50,
                      onClick: {
                        "font-card-monospace": function () {
                          changeFontFamily("monospace");
                        },
                      },
                    },
                  ]),
                },
              ],
            },
            { height: 100 },
          ],
        },
      ],
      rules: {
        themeColor: webix.rules.isNotEmpty,
        fontSize: webix.rules.isNotEmpty,
        backgroundImage: webix.rules.isNotEmpty,
      },
    },
  };
}
