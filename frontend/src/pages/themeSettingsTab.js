import "../styles/settings.css";
import {
  changeFontSize,
  changeFontFamily,
  toggleContrastMode,
  switchTheme
} from "../utils/themeUtil.js";
import { getTabHeader, responsiveLayout } from "../utils/responsiveUtil.js";



if (localStorage.getItem("highContrast") === "true") {
  document.body.classList.add("high-contrast");
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
