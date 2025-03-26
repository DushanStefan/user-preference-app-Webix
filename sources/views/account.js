// import { JetView } from "webix-jet";

// export default class AccountSettingsView extends JetView {
//   config() {
//     return {
//       view: "form",
//       id: "accountSettingsForm",
//       elements: [
//         { view: "text", label: "Username", name: "username", required: true },
//         {
//           view: "text",
//           label: "Email",
//           name: "email",
//           required: true,
//           validate: webix.rules.isEmail,
//         },
//         {
//           view: "text",
//           type: "password",
//           label: "Password",
//           name: "password",
//           required: true,
//         },
//         { view: "button", value: "Save", click: () => this.saveData() },
//       ],
//       rules: {
//         username: webix.rules.isNotEmpty,
//         email: webix.rules.isEmail,
//         password: (value) => value.length >= 6,
//       },
//     };
//   }

//   saveData() {
//     const form = this.getRoot();
//     if (form.validate()) {
//       webix.message("Account settings saved successfully");
//     } else {
//       webix.message({
//         type: "error",
//         text: "Please check the form for errors.",
//       });
//     }
//   }
// }
// ----------------------
// import { JetView } from "webix-jet";

// export default class AccountSettingsView extends JetView {
//   config() {
//     return {
//       view: "form",
//       id: "accountSettingsForm",
//       width: 400,
//       elements: [
//         {
//           view: "text",
//           label: "Username",
//           name: "username",
//           required: true,
//           labelWidth: 120,
//           placeholder: "Enter your username",
//         },
//         {
//           view: "text",
//           label: "Email",
//           name: "email",
//           required: true,
//           validate: webix.rules.isEmail,
//           labelWidth: 120,
//           placeholder: "Enter your email",
//         },
//         {
//           view: "text",
//           type: "password",
//           label: "Password",
//           name: "password",
//           required: true,
//           labelWidth: 120,
//           placeholder: "Enter your password",
//         },
//         {
//           margin: 10,
//           cols: [
//             {
//               view: "button",
//               value: "Cancel",
//               css: "webix_secondary",
//               click: () => this.cancel(),
//             },
//             {
//               view: "button",
//               value: "Save",
//               type: "form",
//               css: "webix_primary",
//               click: () => this.saveData(),
//             },
//           ],
//         },
//       ],
//       rules: {
//         username: webix.rules.isNotEmpty,
//         email: webix.rules.isEmail,
//         password: (value) => value.length >= 6,
//       },
//     };
//   }

//   saveData() {
//     const form = this.getRoot();
//     if (form.validate()) {
//       webix.message({
//         type: "success",
//         text: "Account settings saved successfully",
//       });
//     } else {
//       webix.message({
//         type: "error",
//         text: "Please check the form for errors.",
//       });
//     }
//   }

//   cancel() {
//     this.getRoot().clear();
//     webix.message("Changes discarded");
//   }
// }

import { JetView } from "webix-jet";

export default class AccountSettingsView extends JetView {
  config() {
    return {
      view: "form",
      id: "accountSettingsForm",
      elemHeight: 500,
      width: "auto",
      elements: [
        {
          view: "template",
          template: "Account Settings",
          type: "section",
        },
        {
          margin: 10,
          rows: [
            {
              view: "text",
              label: "Username",
              name: "username",
              id: "username",
              placeholder: "Enter your username",
              validate: webix.rules.isNotEmpty,
              invalidMessage: "Username cannot be empty",
            },
            {
              view: "text",
              label: "Email",
              name: "email",
              id: "email",
              placeholder: "Enter your email",
              validate: webix.rules.isEmail,
              invalidMessage: "Invalid email format",
            },
            {
              view: "text",
              type: "password",
              label: "Current Password",
              name: "currentPassword",
              id: "currentPassword",
              placeholder: "Enter current password",
              validate: webix.rules.isNotEmpty,
              invalidMessage: "Current password is required",
            },
            {
              view: "text",
              type: "password",
              label: "New Password",
              name: "newPassword",
              id: "newPassword",
              placeholder: "Enter new password (optional)",
              validate: (value) => {
                // Optional password validation
                return !value || value.length >= 8;
              },
              invalidMessage: "Password must be at least 8 characters",
            },
            {
              view: "text",
              type: "password",
              label: "Confirm New Password",
              name: "confirmPassword",
              id: "confirmPassword",
              placeholder: "Confirm new password",
              validate: (value) => {
                const newPassword = $$("newPassword").getValue();
                return !newPassword || value === newPassword;
              },
              invalidMessage: "Passwords do not match",
            },
            {
              margin: 10,
              cols: [
                {
                  view: "button",
                  value: "Save Changes",
                  css: "webix_primary",
                  click: () => this.saveAccountSettings(),
                },
                {
                  view: "button",
                  value: "Cancel",
                  css: "webix_secondary",
                  click: () => this.resetForm(),
                },
              ],
            },
          ],
        },
      ],
    };
  }

  init() {
    // Load initial user data
    this.loadUserData();
  }

  loadUserData() {
    // Simulated data loading - replace with actual API call
    const userData = {
      username: "currentUser123",
      email: "user@example.com",
    };

    $$("accountSettingsForm").setValues(userData);
  }

  saveAccountSettings() {
    const form = $$("accountSettingsForm");

    // Validate the entire form
    if (!form.validate()) {
      webix.message({
        type: "error",
        text: "Please correct the highlighted fields",
      });
      return;
    }

    // Collect form data
    const formData = form.getValues();

    // Simulated save process - replace with actual API call
    try {
      // Here you would typically make an API call to update user settings
      console.log("Saving account settings:", formData);

      webix.message({
        type: "success",
        text: "Account settings updated successfully!",
      });
    } catch (error) {
      webix.message({
        type: "error",
        text: "Failed to update account settings",
      });
    }
  }

  resetForm() {
    // Reload original user data
    this.loadUserData();

    // Clear password fields
    $$("currentPassword").setValue("");
    $$("newPassword").setValue("");
    $$("confirmPassword").setValue("");

    webix.message({
      type: "info",
      text: "Form reset to original values",
    });
  }
}
