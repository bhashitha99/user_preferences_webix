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

export function isValidPassword(values) {
  const newPassword = values.newPassword;
  const confirmPassword = values.confirmPassword;
  
  // const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  const re = /^\d{8,}$/;
  const password_validation_result = re.test(newPassword);
  if(!password_validation_result){
    webix.message({
      type: "error",
      text: "Invalid password format. Password must be at least 8 characters.",
    });
  }
  else if( newPassword !== confirmPassword) {
    webix.message({
      type: "error",
      text: "Passwords do not match. Please ensure both passwords are the same.",
    })
    }
    const result = password_validation_result && (newPassword === confirmPassword);

    return result;
}