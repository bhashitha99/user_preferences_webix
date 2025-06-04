export function isValidEmail(values) {
  console.log("Validating email:", values.email);
  const email = values.email;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const result = re.test(email);
  console.log("Email validation result:", result);
    if (!result) {
        webix.message({
        type: "error",
        text: "Invalid email format. Please enter a valid email address.",
        });
    }
    return result;
}