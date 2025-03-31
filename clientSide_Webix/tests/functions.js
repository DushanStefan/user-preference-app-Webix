// functions.js
function validateMobileNumber(mobileNumber, countryCode) {
  let minLength = 10,
    maxLength = 10;

  switch (countryCode) {
    case "+1": // USA
    case "+44": // UK
    case "+91": // India
      minLength = maxLength = 10;
      break;
    default:
      minLength = 10;
      maxLength = 15; // Generic case
  }

  return (
    /^[0-9]+$/.test(mobileNumber) &&
    mobileNumber.length >= minLength &&
    mobileNumber.length <= maxLength
  );
}

function checkPasswordStrength(password) {
  if (!password) return "Weak";
  if (
    password.length > 8 &&
    /[A-Z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  ) {
    return "Strong";
  } else if (
    password.length > 5 &&
    (/[A-Z]/.test(password) || /\d/.test(password))
  ) {
    return "Medium";
  }
  return "Weak";
}

function validateUsername(value) {
  return value && !value.includes(" ") && value.length >= 3;
}

function validateFullName(name) {
  if (!name || name.trim().length < 2) {
    throw new Error("Full name must be at least 2 characters long");
  }
  return name.trim();
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{8,}$/;
  if (!password) {
    throw new Error("Password is required");
  }
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must contain at least one letter, one number, and be at least 8 characters long with allowed special characters (@#$%^&+=)"
    );
  }
  return true;
}

function validateLength(value) {
  if (value.length > 30) {
    throw new Error("Value must be 30 characters or fewer");
  }
  return true;
}

module.exports = {
  validateMobileNumber,
  checkPasswordStrength,
  validateUsername,
  validateFullName,
  validatePassword,
  validateLength,
};
