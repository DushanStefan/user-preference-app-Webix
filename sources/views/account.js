import { JetView } from "webix-jet";

export default class AccountSettingsView extends JetView {
  config() {
    return {
      view: "form",
      id: "account_settings_form",
      elementsConfig: { labelWidth: 100 },
      elements: [
        {
          view: "tabview",
          id: "account_settings_tabs",
          tabbar: {
            optionWidth: 150,
            type: "bottom",
          },
          cells: [
            {
              header: "Personal Info",
              body: this._personalInfoTab(),
            },
            {
              header: "Security",
              body: this._securityTab(),
            },
            {
              header: "Privacy",
              body: this._privacyTab(),
            },
            {
              header: "Login Activity",
              body: this._loginActivityTab(),
            },
          ],
        },
        {
          margin: 10,
          cols: [
            { width: 150 }, // Spacer
            {
              view: "button",
              value: "Save Changes",
              css: "webix_primary",
              click: () => this.saveChanges(),
            },
            {
              view: "button",
              value: "Cancel",
              css: "webix_secondary",
              click: () => this.cancelChanges(),
            },
          ],
        },
      ],
    };
  }

  _personalInfoTab() {
    return {
      rows: [
        {
          cols: [
            // Profile Picture Section
            {
              rows: [
                {
                  view: "template",
                  template: "Profile Picture",
                  type: "section",
                },
                {
                  view: "template",
                  id: "profile_pic_preview",
                  height: 200,
                  template: (obj) => `
                    <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                      <img src="${obj.profile_pic || this.getDefaultAvatar()}" 
                           style="max-width: 200px; max-height: 200px; border-radius: 50%; object-fit: cover;"/>
                    </div>
                  `,
                },
                {
                  view: "uploader",
                  id: "profile_pic_uploader",
                  value: "Upload Picture",
                  accept: "image/jpeg,image/png,image/webp",
                  multiple: false,
                  upload: "/upload/profile",
                  on: {
                    onBeforeFileAdd: (file) =>
                      this._handleProfilePicUpload(file),
                  },
                },
              ],
              width: 250,
            },
            // Personal Details Section
            {
              rows: [
                {
                  view: "text",
                  label: "Full Name",
                  name: "full_name",
                  placeholder: "Enter full name",
                },
                {
                  view: "text",
                  label: "Username",
                  name: "username",
                  placeholder: "Choose a username",
                },
                {
                  view: "text",
                  label: "Email",
                  name: "email",
                  placeholder: "Enter email address",
                },
                {
                  view: "datepicker",
                  label: "Date of Birth",
                  name: "dob",
                  format: "%Y-%m-%d",
                },
              ],
            },
          ],
        },
        {
          view: "textarea",
          label: "Bio",
          name: "bio",
          height: 100,
          placeholder: "Tell us about yourself",
        },
      ],
    };
  }

  _securityTab() {
    return {
      rows: [
        {
          view: "text",
          type: "password",
          label: "Current Password",
          name: "current_password",
        },
        {
          view: "text",
          type: "password",
          label: "New Password",
          name: "new_password",
        },
        {
          view: "text",
          type: "password",
          label: "Confirm Password",
          name: "confirm_password",
        },
      ],
    };
  }

  _privacyTab() {
    return {
      rows: [
        {
          view: "checkbox",
          label: "Profile Visibility",
          name: "profile_visible",
        },
        {
          view: "checkbox",
          label: "Allow Data Sharing",
          name: "data_sharing",
        },
        {
          view: "checkbox",
          label: "Receive Marketing Emails",
          name: "marketing_emails",
        },
      ],
    };
  }

  _loginActivityTab() {
    return {
      view: "datatable",
      columns: [
        { id: "date", header: "Date", width: 150 },
        { id: "ip", header: "IP Address", width: 150 },
        { id: "device", header: "Device", fillspace: true },
      ],
      data: [
        { date: "2024-03-27", ip: "192.168.1.1", device: "Chrome, Windows" },
        { date: "2024-03-26", ip: "10.0.0.1", device: "Safari, MacOS" },
      ],
    };
  }

  init() {
    this.loadUserData();
  }

  _handleProfilePicUpload(upload) {
    const file = upload.file;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        $$("profile_pic_preview").setValues({
          profile_pic: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
    return true;
  }

  getDefaultAvatar() {
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <circle cx='50' cy='50' r='45' fill='%23f0f0f0'/>
      <circle cx='50' cy='40' r='20' fill='%23888888'/>
      <path d='M20,80 Q50,95 80,80 Q50,110 20,80Z' fill='%23888888'/>
    </svg>`;
  }

  loadUserData() {
    const userData = {
      full_name: "John Doe",
      username: "johndoe",
      email: "john.doe@example.com",
      bio: "Software Developer",
      dob: new Date(1990, 0, 1),
      profile_pic: this.getDefaultAvatar(),
      profile_visible: true,
      data_sharing: false,
      marketing_emails: true,
    };

    $$("account_settings_form").setValues(userData);
    $$("profile_pic_preview").setValues({ profile_pic: userData.profile_pic });
  }

  saveChanges() {
    const formData = $$("account_settings_form").getValues();

    // Basic validation
    if (!formData.full_name || !formData.email) {
      webix.message({
        text: "Please fill in required fields",
        type: "error",
      });
      return;
    }

    // Simulate save process
    webix.message({
      text: "Changes saved successfully!",
      type: "success",
    });

    console.log("Saved Data:", formData);
  }

  cancelChanges() {
    this.loadUserData();
    webix.message({
      text: "Changes cancelled",
      type: "info",
    });
  }
}
// import { JetView } from "webix-jet";

// export default class AccountSettingsView extends JetView {
//   config() {
//     return {
//       view: "form",
//       id: "accountSettingsForm",
//       elemHeight: 500,
//       width: "auto",
//       elements: [
//         {
//           view: "template",
//           template: "Account Settings",
//           type: "section",
//         },
//         {
//           margin: 10,
//           rows: [
//             {
//               view: "text",
//               label: "Username",
//               name: "username",
//               id: "username",
//               placeholder: "Enter your username",
//               validate: webix.rules.isNotEmpty,
//               invalidMessage: "Username cannot be empty",
//             },
//             {
//               view: "text",
//               label: "Email",
//               name: "email",
//               id: "email",
//               placeholder: "Enter your email",
//               validate: webix.rules.isEmail,
//               invalidMessage: "Invalid email format",
//             },
//             {
//               view: "text",
//               type: "password",
//               label: "Current Password",
//               name: "currentPassword",
//               id: "currentPassword",
//               placeholder: "Enter current password",
//               validate: webix.rules.isNotEmpty,
//               invalidMessage: "Current password is required",
//             },
//             {
//               view: "text",
//               type: "password",
//               label: "New Password",
//               name: "newPassword",
//               id: "newPassword",
//               placeholder: "Enter new password (optional)",
//               validate: (value) => {
//                 // Optional password validation
//                 return !value || value.length >= 8;
//               },
//               invalidMessage: "Password must be at least 8 characters",
//             },
//             {
//               view: "text",
//               type: "password",
//               label: "Confirm New Password",
//               name: "confirmPassword",
//               id: "confirmPassword",
//               placeholder: "Confirm new password",
//               validate: (value) => {
//                 const newPassword = $$("newPassword").getValue();
//                 return !newPassword || value === newPassword;
//               },
//               invalidMessage: "Passwords do not match",
//             },
//             {
//               margin: 10,
//               cols: [
//                 {
//                   view: "button",
//                   value: "Save Changes",
//                   css: "webix_primary",
//                   click: () => this.saveAccountSettings(),
//                 },
//                 {
//                   view: "button",
//                   value: "Cancel",
//                   css: "webix_secondary",
//                   click: () => this.resetForm(),
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     };
//   }

//   init() {
//     // Load initial user data
//     this.loadUserData();
//   }

//   loadUserData() {
//     // Simulated data loading - replace with actual API call
//     const userData = {
//       username: "currentUser123",
//       email: "user@example.com",
//     };

//     $$("accountSettingsForm").setValues(userData);
//   }

//   saveAccountSettings() {
//     const form = $$("accountSettingsForm");

//     // Validate the entire form
//     if (!form.validate()) {
//       webix.message({
//         type: "error",
//         text: "Please correct the highlighted fields",
//       });
//       return;
//     }

//     // Collect form data
//     const formData = form.getValues();

//     // Simulated save process - replace with actual API call
//     try {
//       // Here you would typically make an API call to update user settings
//       console.log("Saving account settings:", formData);

//       webix.message({
//         type: "success",
//         text: "Account settings updated successfully!",
//       });
//     } catch (error) {
//       webix.message({
//         type: "error",
//         text: "Failed to update account settings",
//       });
//     }
//   }

//   resetForm() {
//     // Reload original user data
//     this.loadUserData();

//     // Clear password fields
//     $$("currentPassword").setValue("");
//     $$("newPassword").setValue("");
//     $$("confirmPassword").setValue("");

//     webix.message({
//       type: "info",
//       text: "Form reset to original values",
//     });
//   }
// }

// import { JetView } from "webix-jet";

// export default class AccountSettingsView extends JetView {
//   config() {
//     // Tabview for different sections of account settings
//     const accountSettingsLayout = {
//       view: "tabview",
//       id: "account_settings_tabview",
//       tabbar: {
//         css: "custom_tabbar",
//         optionWidth: 150,
//         type: "bottom",
//       },
//       cells: [
//         {
//           header: "Personal Info",
//           body: this._personalInfoView(),
//         },
//         {
//           header: "Security",
//           body: this._securityView(),
//         },
//         {
//           header: "Privacy",
//           body: this._privacyView(),
//         },
//         {
//           header: "Login Activity",
//           body: this._loginActivityView(),
//         },
//       ],
//     };

//     return {
//       rows: [
//         {
//           view: "toolbar",
//           elements: [
//             { view: "label", label: "Account Settings" },
//             {
//               view: "button",
//               value: "Save Changes",
//               css: "webix_primary",
//               width: 150,
//               click: () => this.saveChanges(),
//             },
//           ],
//         },
//         accountSettingsLayout,
//       ],
//     };
//   }

//   _personalInfoView() {
//     return {
//       view: "form",
//       id: "personal_info_form",
//       elementsConfig: { labelWidth: 150 },
//       elements: [
//         {
//           rows: [
//             {
//               cols: [
//                 {
//                   rows: [
//                     {
//                       view: "template",
//                       template: "Profile Picture",
//                       type: "section",
//                     },
//                     {
//                       view: "uploader",
//                       value: "Upload Picture",
//                       name: "profile_pic",
//                       accept: "image/jpeg,image/png,image/webp",
//                       multiple: false,
//                       link: "uploadedFile",
//                       upload: "/upload/profile",
//                       css: "webix_primary",
//                     },
//                   ],
//                 },
//                 {
//                   rows: [
//                     {
//                       view: "text",
//                       label: "Full Name",
//                       name: "full_name",
//                       validate: webix.rules.isNotEmpty,
//                     },
//                     {
//                       view: "text",
//                       label: "Display Name",
//                       name: "username",
//                       validate: (value) => {
//                         // Username validation
//                         const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/;
//                         return usernameRegex.test(value);
//                       },
//                     },
//                   ],
//                 },
//               ],
//             },
//             {
//               view: "textarea",
//               label: "Bio",
//               name: "bio",
//               height: 100,
//             },
//             {
//               view: "datepicker",
//               label: "Date of Birth",
//               name: "dob",
//             },
//             {
//               view: "combo",
//               label: "Country",
//               name: "country",
//               options: [
//                 { id: "US", value: "United States" },
//                 { id: "CA", value: "Canada" },
//                 { id: "UK", value: "United Kingdom" },
//                 // Add more countries
//               ],
//             },
//             {
//               view: "text",
//               label: "Phone Number",
//               name: "phone",
//               validate: webix.rules.isNumber,
//             },
//           ],
//         },
//       ],
//     };
//   }

//   _securityView() {
//     return {
//       view: "form",
//       id: "security_form",
//       elementsConfig: { labelWidth: 150 },
//       elements: [
//         {
//           view: "text",
//           type: "password",
//           label: "Current Password",
//           name: "current_password",
//           validate: webix.rules.isNotEmpty,
//         },
//         {
//           view: "text",
//           type: "password",
//           label: "New Password",
//           name: "new_password",
//           validate: (value) => {
//             const strongRegex =
//               /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
//             return strongRegex.test(value);
//           },
//         },
//         {
//           view: "text",
//           type: "password",
//           label: "Confirm New Password",
//           name: "confirm_password",
//           validate: (value) => {
//             const newPassword = $$("security_form").getValues().new_password;
//             return value === newPassword;
//           },
//         },
//         {
//           view: "template",
//           template:
//             "Password Strength: <span id='password_strength'>Not Checked</span>",
//           height: 30,
//         },
//       ],
//     };
//   }

//   _privacyView() {
//     return {
//       rows: [
//         {
//           view: "label",
//           label: "Manage Your Privacy Preferences",
//           css: "settings_header",
//         },
//         {
//           view: "form",
//           elementsConfig: { labelRight: 200 },
//           elements: [
//             {
//               view: "checkbox",
//               label: "Profile Visibility",
//               name: "profile_visible",
//             },
//             {
//               view: "checkbox",
//               label: "Allow Data Sharing",
//               name: "data_sharing",
//             },
//             {
//               view: "checkbox",
//               label: "Receive Marketing Emails",
//               name: "marketing_emails",
//             },
//           ],
//         },
//       ],
//     };
//   }

//   _loginActivityView() {
//     return {
//       rows: [
//         {
//           view: "datatable",
//           id: "login_activity_table",
//           columns: [
//             { id: "date", header: "Date", width: 150 },
//             { id: "ip", header: "IP Address", width: 150 },
//             { id: "device", header: "Device", fillspace: true },
//             {
//               id: "actions",
//               header: "Actions",
//               template: "{common.trashIcon()}",
//             },
//           ],
//           data: [
//             {
//               id: 1,
//               date: "2024-03-27",
//               ip: "192.168.1.1",
//               device: "Chrome, Windows",
//             },
//             {
//               id: 2,
//               date: "2024-03-26",
//               ip: "10.0.0.1",
//               device: "Safari, MacOS",
//             },
//           ],
//           onClick: {
//             webix_icon: (e, id) => this.removeLoginActivity(id),
//           },
//         },
//       ],
//     };
//   }

//   init() {
//     // Add password strength checker
//     this._setupPasswordStrengthChecker();

//     // Load initial user data
//     this.loadUserData();
//   }

//   _setupPasswordStrengthChecker() {
//     const passwordField = $$("security_form")
//       .getChildViews()
//       .find((view) => view.config.name === "new_password");

//     passwordField.attachEvent("onTimedKeyPress", () => {
//       const password = passwordField.getValue();
//       const strengthIndicator = document.getElementById("password_strength");

//       if (password.length === 0) {
//         strengthIndicator.innerHTML = "Not Checked";
//         strengthIndicator.style.color = "black";
//       } else if (password.length < 8) {
//         strengthIndicator.innerHTML = "Weak";
//         strengthIndicator.style.color = "red";
//       } else if (password.length < 12) {
//         strengthIndicator.innerHTML = "Medium";
//         strengthIndicator.style.color = "orange";
//       } else {
//         strengthIndicator.innerHTML = "Strong";
//         strengthIndicator.style.color = "green";
//       }
//     });
//   }

//   loadUserData() {
//     const userData = {
//       full_name: "John Doe",
//       username: "johndoe",
//       bio: "Software Developer",
//       dob: new Date(1990, 0, 1),
//       country: "US",
//       phone: "+1 (555) 123-4567",
//     };

//     $$("personal_info_form").setValues(userData);
//   }

//   saveChanges() {
//     // Validate all forms
//     const personalForm = $$("personal_info_form");
//     const securityForm = $$("security_form");
//     const privacyForm = $$("privacy_form");

//     if (personalForm.validate() && securityForm.validate()) {
//       const personalData = personalForm.getValues();
//       const securityData = securityForm.getValues();
//       const privacyData = privacyForm.getValues();

//       // Combine and prepare data for submission
//       const combinedData = {
//         ...personalData,
//         ...securityData,
//         ...privacyData,
//       };

//       // Here you would typically send data to your backend
//       webix.message({
//         text: "Changes saved successfully!",
//         type: "success",
//       });
//     } else {
//       webix.message({
//         text: "Please correct the errors in the form.",
//         type: "error",
//       });
//     }
//   }

//   removeLoginActivity(id) {
//     const table = $$("login_activity_table");
//     webix.confirm({
//       text: "Are you sure you want to remove this login activity?",
//       callback: (result) => {
//         if (result) {
//           table.remove(id);
//         }
//       },
//     });
//   }
// }
