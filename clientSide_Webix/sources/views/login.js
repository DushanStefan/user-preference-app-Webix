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

    // Access auth through the global window.app reference

    // const auth = this.app.getState().auth;
    // const auth = this.app.getService("auth");

    // Try to authenticate
    // if (auth.login(values.username, values.password)) {
    localStorage.setItem("loggedUser", JSON.stringify(true));
    console.log(112);

    if (window.updateNavbar) {
      window.updateNavbar(); // Ensure navbar updates
    }
    this.app.show("top/account");

    // } else {
    //   webix.message({ type: "error", text: "Invalid credentials" });
    // }
  }
}
