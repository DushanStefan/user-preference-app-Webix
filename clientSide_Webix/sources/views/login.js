import { JetView } from "webix-jet";
import { Navbar } from "./toolbar";

export default class LoginView extends JetView {
  config() {
    return {
      rows: [
        Navbar,
        {
          view: "form",
          id: "loginForm",
          elements: [
            {
              view: "text",
              label: "Username",
              labelWidth: 120,
              name: "username",
              required: true,
            },
            {
              view: "text",
              label: "Password",
              labelWidth: 120,
              type: "password",
              name: "password",
              required: true,
            },
            {
              view: "button",
              value: "Login",
              css: "webix_primary",
              click: () => this.login(),
              hotkey: "enter",
            },
          ],
        },
      ],
    };
  }

  login() {
    const form = this.$$("loginForm");
    const values = form.getValues();
    console.log("Login values:", values);

    // Access auth through the global window.app reference

    // const auth = this.app.getState().auth;
    // const auth = this.app.getService("auth");

    // Try to authenticate
    // if (auth.login(values.username, values.password)) {
    webix
      .ajax()
      .post("http://127.0.0.1:8000/api/accounts/login/", values)
      .then((response) => {
        return response.json(); // Convert response to JSON
      })
      .then((data) => {
        console.log("Login Response:", data); // Log the parsed response

        // Log each field separately
        console.log("Access Token:", data.access);
        console.log("Message:", data.message);
        console.log("Email:", data.email);
        console.log("Full Name:", data.full_name);
        console.log("Username:", data.username);

        webix.message("Login successful for " + values.username);

        localStorage.setItem("loggedUser", JSON.stringify(data.username));
        localStorage.setItem("loggedEmail", JSON.stringify(data.email));
        localStorage.setItem("loggedFullName", JSON.stringify(data.full_name));
        localStorage.setItem("accessToken", JSON.stringify(data.access));

        if (window.updateNavbar) {
          window.updateNavbar(); // Ensure navbar updates
        }
        this.app.show("top/account");
      })
      .catch((error) => {
        console.error("Login Error:", error.responseText);
        webix.message({
          type: "error",
          text: "Login failed: " + (error.responseText || "Unknown error"),
        });
      });

    // } else {
    //   webix.message({ type: "error", text: "Invalid credentials" });
    // }
  }
}
