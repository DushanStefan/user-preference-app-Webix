import { JetView } from "webix-jet";
import { Navbar } from "../assets/toolbar";

export default class SignupPage extends JetView {
  config() {
    return {
      rows: [
        Navbar,
        {
          type: "space",
          rows: [
            {
              view: "form",
              width: 400,
              elements: [
                {
                  view: "text",
                  label: "Username",
                  name: "username",
                  required: true,
                  invalidMessage: "Username must be at least 3 characters long",
                  validate: (value) => value.length >= 3,
                },
                {
                  view: "text",
                  label: "Email",
                  name: "email",
                  required: true,
                  invalidMessage: "Enter a valid email address",
                  validate: webix.rules.isEmail,
                },
                {
                  view: "text",
                  type: "password",
                  label: "Password",
                  name: "password",
                  required: true,
                  invalidMessage:
                    "Password must be at least 6 characters and contain a number",
                  validate: (value) => /^(?=.*\d).{6,}$/.test(value),
                },
                {
                  view: "button",
                  value: "Sign Up",
                  css: "webix_primary",
                  click: () => this.signupUser(),
                },
              ],
            },
          ],
        },
      ],
    };
  }

  signupUser() {
    const form = this.getRoot().queryView({ view: "form" });
    if (form.validate()) {
      const values = form.getValues();
      webix.message("Signup successful for " + values.username);
      // Add signup logic here (e.g., API call)

      this.app.show("/top/account");
      localStorage.setItem("loggedUser", JSON.stringify(false));
    }
  }
}
