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
  localStorage.setItem("userFontSize", size);
}

function changeFontFamily(fontName) {
  document.documentElement.style.setProperty("--user-font-family", fontName);
  localStorage.setItem("userFontFamily", fontName);
}

function toggleContrastMode() {
  const isEnabled = document.body.classList.toggle("high-contrast");
  localStorage.setItem("highContrast", isEnabled);
}


if (localStorage.getItem("highContrast") === "true") {
  document.body.classList.add("high-contrast");
}

function switchTheme(themeName) {
  const themeLink = document.getElementById("webix-theme");
  themeLink.href = `https://cdn.webix.com/edge/skins/${themeName}.css`;
  webix.skin.set(themeName);
  localStorage.setItem("webixTheme", themeName);
}

export function loadSavedThemeSettings() {
  const savedTheme = localStorage.getItem("webixTheme");
  const savedFontSize = localStorage.getItem("userFontSize");
  const savedFontFamily = localStorage.getItem("userFontFamily");
  const contrastEnabled = localStorage.getItem("highContrast") === "true";

  if (savedTheme) switchTheme(savedTheme);
  if (savedFontSize) changeFontSize(savedFontSize);
  if (savedFontFamily) changeFontFamily(savedFontFamily);
  if (contrastEnabled) document.body.classList.add("high-contrast");
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

            {
              view: "switch",
              label: "High Contrast Mode",
              labelWidth: 200,
              value: localStorage.getItem("highContrast") === "true" ? 1 : 0,
              on: {
                onChange: function (newValue) {
                  const enabled = newValue === 1;
                  if (enabled) {
                    document.body.classList.add("high-contrast");
                  } else {
                    document.body.classList.remove("high-contrast");
                  }
                  localStorage.setItem("highContrast", enabled);
                },
              },
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
