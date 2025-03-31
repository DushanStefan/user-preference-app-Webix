// functions.test.js
const {
  validateMobileNumber,
  checkPasswordStrength,
  validateUsername,
  validateFullName,
  validatePassword,
  validateLength,
} = require("./functions");

test("validateMobileNumber should return true for valid numbers", () => {
  expect(validateMobileNumber("1234567890", "+1")).toBe(true);
  expect(validateMobileNumber("9876543210", "+91")).toBe(true);
});

test("validateMobileNumber should return false for invalid numbers", () => {
  expect(validateMobileNumber("12345", "+1")).toBe(false);
  expect(validateMobileNumber("abcdefghij", "+91")).toBe(false);
});

test("checkPasswordStrength should return correct strength levels", () => {
  expect(checkPasswordStrength("abc")).toBe("Weak");
  expect(checkPasswordStrength("Abc123")).toBe("Medium");
  expect(checkPasswordStrength("Abc123!@#")).toBe("Strong");
});

test("validateUsername should return true for valid usernames", () => {
  expect(validateUsername("validUser")).toBe(true);
});

test("validateFullName should throw error for short names", () => {
  expect(() => validateFullName("A")).toThrow(
    "Full name must be at least 2 characters long"
  );
});

test("validateFullName should return trimmed name for valid input", () => {
  expect(validateFullName(" John Doe ")).toBe("John Doe");
});

test("validatePassword should throw error for invalid passwords", () => {
  expect(() => validatePassword("123")).toThrow(
    "Password must contain at least one letter, one number, and be at least 8 characters long"
  );
});

test("validatePassword should return true for valid passwords", () => {
  expect(validatePassword("Abc12345")).toBe(true);
});

test("validateLength should throw error for too long input", () => {
  expect(() => validateLength("a".repeat(31))).toThrow(
    "Value must be 30 characters or fewer"
  );
});

test("validateLength should return true for valid length", () => {
  expect(validateLength("a".repeat(30))).toBe(true);
});
