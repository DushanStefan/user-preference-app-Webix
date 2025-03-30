import { JetView } from "webix-jet";
import { Navbar } from "../assets/toolbar";

export default class LoginView extends JetView {
  config() {
    return {
      rows: [
        Navbar,
        {
          view: "form",
          id: "loginForm",
          elements: [
            { view: "text", label: "Username", name: "username" },
            {
              view: "text",
              label: "Password",
              type: "password",
              name: "password",
            },
            {
              view: "button",
              value: "Login",
              css: "webix_primary",
              click: () => this.login(),
            },
          ],
        },
      ],
    };
  }

  login() {
    const form = this.$$("loginForm");
    const values = form.getValues();

    // Access auth through the global window.app reference

    // const auth = this.app.getState().auth;
    // const auth = this.app.getService("auth");

    // Try to authenticate
    // if (auth.login(values.username, values.password)) {
    this.app.show("/top/account");
    localStorage.setItem("loggedUser", JSON.stringify(false));
    // } else {
    //   webix.message({ type: "error", text: "Invalid credentials" });
    // }
  }
}

// import { JetView } from "webix-jet";
// import { AuthModel } from "./auth";

// export default class LoginView extends JetView {
//   //   constructor(app, name) {
//   //     super(app, name);
//   //     this.auth = this.app.getState().auth || new AuthModel(); // Initialize AuthModel instance
//   //   }

//   init() {
//     // Initialize AuthModel instance from app state
//     this.auth = this.app.getState().auth || new AuthModel(); // Ensure AuthModel instance is set
//   }

//   config() {
//     return {
//       view: "form",
//       id: "loginForm",
//       elements: [
//         { view: "text", label: "Username", name: "username" },
//         { view: "text", label: "Password", type: "password", name: "password" },
//         {
//           view: "button",
//           value: "Login",
//           click: () => this.login(),
//         },
//       ],
//     };
//   }

//   // Login method
//   login() {
//     const form = this.$$("loginForm");
//     const values = form.getValues();

//     // Authenticate using AuthModel
//     if (this.auth.login(values.username, values.password)) {
//       this.app.show("/top/account"); // Redirect to dashboard if authenticated
//     } else {
//       webix.message({ type: "error", text: "Invalid username or password." });
//     }
//   }
// }
