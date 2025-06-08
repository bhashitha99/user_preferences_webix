import { isValidEmail, isValidPassword } from "../src/utils/validations";

global.webix = {
  message: jest.fn(), 
};

describe("Validation Utils", () => {
  beforeEach(() => {
    webix.message.mockClear();
  });

  // Email Validation Tests
  describe("isValidEmail", () => {
    test("returns true for valid email", () => {
      const result = isValidEmail({ email: "user@example.com" });
      expect(result).toBe(true);
      expect(webix.message).not.toHaveBeenCalled();
    });

    test("returns false for invalid email", () => {
      const result = isValidEmail({ email: "invalid-email" });
      expect(result).toBe(false);
      expect(webix.message).toHaveBeenCalledWith({
        type: "error",
        text: "Invalid email format. Please enter a valid email address.",
      });
    });

    test("returns false for empty email", () => {
      const result = isValidEmail({ email: "" });
      expect(result).toBe(false);
      expect(webix.message).toHaveBeenCalled();
    });
  });

  // Password Validation Tests
  describe("isValidPassword", () => {
    test("returns true for valid matching passwords", () => {
      const result = isValidPassword({
        newPassword: "12345678",
        confirmPassword: "12345678",
      });
      expect(result).toBe(true);
      expect(webix.message).not.toHaveBeenCalled();
    });

    test("returns false for password that doesn't match regex", () => {
      const result = isValidPassword({
        newPassword: "1234",
        confirmPassword: "1234",
      });
      expect(result).toBe(false);
      expect(webix.message).toHaveBeenCalledWith({
        type: "error",
        text: "Invalid password format. Password must be at least 8 characters.",
      });
    });

    test("returns false for passwords that do not match", () => {
      const result = isValidPassword({
        newPassword: "12345678",
        confirmPassword: "87654321",
      });
      expect(result).toBe(false);
      expect(webix.message).toHaveBeenCalledWith({
        type: "error",
        text: "Passwords do not match. Please ensure both passwords are the same.",
      });
    });

    test("returns false when password format is invalid and also mismatched", () => {
      const result = isValidPassword({
        newPassword: "123",
        confirmPassword: "456",
      });
      expect(result).toBe(false);
      expect(webix.message).toHaveBeenCalledWith({
        type: "error",
        text: "Invalid password format. Password must be at least 8 characters.",
      });
    });
  });
});
