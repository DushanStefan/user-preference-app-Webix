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

// export class AuthModel {
//   constructor() {
//     this.loggedIn = false; // Initial login state
//   }

//   // Simulate login by updating the loggedIn state
//   login(username, password) {
//     if (username === "admin" && password === "password123") {
//       this.loggedIn = true;
//     } else {
//       this.loggedIn = false;
//     }
//     return this.loggedIn;
//   }

//   // Log out the user
//   logout() {
//     this.loggedIn = false;
//   }

//   // Check if the user is authenticated
//   isAuthenticated() {
//     return this.loggedIn;
//   }
// }
