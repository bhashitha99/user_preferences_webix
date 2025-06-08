// utils/themeUtils.test.js
import {
  changeFontSize,
  changeFontFamily,
  loadSavedThemeSettings,
} from "../src/utils/themeUtil.js";

describe("Theme Utils", () => {
  beforeEach(() => {
    document.documentElement.style.setProperty = jest.fn();
  });

  test("changeFontSize sets font size", () => {
    localStorage.setItem = jest.fn();
    changeFontSize("18px");
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith("--user-font-size", "18px");
  });
  test("changeFontSize sets font size", () => {
    localStorage.setItem = jest.fn();
    changeFontSize("14px");
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith("--user-font-size", "14px");
  });


  test("changeFontFamily sets font family", () => {
    localStorage.setItem = jest.fn();
    changeFontFamily("Roboto");
    expect(document.documentElement.style.setProperty).toHaveBeenCalledWith("--user-font-family", "Roboto");

  });


});
