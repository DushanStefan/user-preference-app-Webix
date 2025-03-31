// Create a simple auth service in a file like services/auth.js
export class AuthModel {
  constructor() {
    this.user = null;
  }

  login(username, password) {
    // This is where you would normally validate against a server
    // For testing, let's use a simple check
    if (username === "admin" && password === "password") {
      this.user = { username, role: "admin" };
      return true;
    }
    return false;
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return !!this.user;
  }

  logout() {
    this.user = null;
  }
}
