export function changeFontSize(size) {
  document.documentElement.style.setProperty("--user-font-size", size);
  localStorage.setItem("userFontSize", size);
}

export function changeFontFamily(fontName) {
  document.documentElement.style.setProperty("--user-font-family", fontName);
  localStorage.setItem("userFontFamily", fontName);
}

export function toggleContrastMode() {
  const isEnabled = document.body.classList.toggle("high-contrast");
  localStorage.setItem("highContrast", isEnabled);
}

export function switchTheme(themeName) {
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