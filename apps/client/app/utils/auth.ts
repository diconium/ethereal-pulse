export function validateInput(
  email: string,
  password: string,
  confirmPassword?: string
) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof email !== "string" || email.length === 0) {
    throw new Error("Email is required.");
  }

  if (!emailPattern.test(email)) {
    return { error: "Invalid email format." };
  }

  if (typeof password !== "string" || password.length < 6) {
    throw new Error("Password must be at least 6 characters.");
  }

  if (confirmPassword && password !== confirmPassword) {
    throw new Error("Passwords do not match.");
  }
}