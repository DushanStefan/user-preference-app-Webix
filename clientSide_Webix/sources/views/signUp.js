import { JetView } from "webix-jet";
import { Navbar } from "./toolbar";

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
                  label: "Full Name",
                  labelWidth: 120,
                  name: "full_name",
                  required: true,
                  invalidMessage: "Username must be at most 30 characters long",
                  validate: (value) => value.length <= 30,
                },
                {
                  view: "text",
                  label: "Username",
                  labelWidth: 120,
                  name: "username",
                  required: true,
                  invalidMessage:
                    "Username must be at least 3 characters long and cannot contain spaces",
                  validate: (value) =>
                    value && !value.includes(" ") && value.length >= 3,
                },
                {
                  view: "text",
                  label: "Email",
                  labelWidth: 120,
                  name: "email",
                  required: true,
                  invalidMessage: "Enter a valid email address",
                  validate: webix.rules.isEmail,
                },
                {
                  view: "text",
                  type: "password",
                  label: "Password",
                  labelWidth: 120,
                  name: "password",
                  required: true,
                  invalidMessage:
                    "Password must be at least 8 characters long and contain both letters and numbers.",
                  validate: (value) =>
                    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{8,}$/.test(
                      value
                    ),
                },

                {
                  view: "button",
                  value: "Sign Up",
                  css: "webix_primary",
                  click: () => this.signupUser(),
                  hotkey: "enter",
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

      console.log("Signup values:", values);

      webix
        .ajax()
        .post("http://127.0.0.1:8000/api/accounts/register/", values)
        .then((response) => {
          return response.json(); // Convert response to JSON
        })
        .then((data) => {
          console.log("Signup Response:", data); // Log the parsed response
          webix.message("Signup successful for " + values.username);
          this.app.show("/login");
          localStorage.setItem("loggedUser", JSON.stringify(values.username));
          localStorage.setItem("loggedEmail", JSON.stringify(values.email));
          localStorage.setItem(
            "loggedFullName",
            JSON.stringify(values.full_name)
          );
        })
        .catch((error) => {
          console.error("Signup Error:", error.responseText);
          webix.message({
            type: "error",
            text: "Signup failed: " + (error.responseText || "Unknown error"),
          });
        });
    }
  }
}
