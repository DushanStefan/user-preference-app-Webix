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
              header: "Login Activity",
              body: this._loginActivityTab(),
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
                {
                  view: "button",
                  value: "Remove Profile Photo",
                  css: "webix_danger",
                  click: () => this.removeProfilePhoto(),
                },
              ],
              width: 250,
              padding: { right: 20 },
            },
            { width: 20 },
            // Personal Details Section

            {
              id: "userForm",
              rows: [
                {
                  view: "text",
                  label: "Full Name",
                  name: "full_name",
                  placeholder: "Enter full name",
                  bottomPadding: 20,
                  labelWidth: 150,
                },
                {
                  view: "text",
                  label: "Username",
                  name: "username",
                  placeholder: "Choose a username",
                  bottomPadding: 20,
                  labelWidth: 150,
                },
                {
                  view: "text",
                  label: "Email",
                  name: "email",
                  placeholder: "Enter email address",
                  bottomPadding: 20,
                  labelWidth: 150,
                  validate: webix.rules.isEmail,
                  invalidMessage: "Please enter a valid email address.",
                },
                {
                  view: "combo",
                  label: "Country Code",
                  id: "countryCode",
                  options: [
                    { id: "+1", value: "USA (+1)" },
                    { id: "+44", value: "UK (+44)" },
                    { id: "+91", value: "India (+91)" },
                    // Add more country codes as needed
                  ],
                  value: "+1", // Default country code
                  required: true,
                },
                {
                  view: "text",
                  label: "Mobile Number",
                  id: "mobileNumber",
                  name: "mobile",
                  placeholder: "Enter mobile number",
                  required: true,
                  invalidMessage: "Please enter a valid mobile number.",
                  validate: function (value) {
                    const countryCode = $$("countryCode").getValue();
                    let minLength = 10; // Default min length
                    let maxLength = 10; // Default max length

                    // Adjust lengths based on the country code
                    if (countryCode === "+1") {
                      minLength = maxLength = 10; // USA
                    } else if (countryCode === "+44") {
                      minLength = maxLength = 10; // UK
                    } else if (countryCode === "+91") {
                      minLength = 10; // India
                      maxLength = 10;
                    }

                    // Check length
                    if (value.length < minLength || value.length > maxLength) {
                      return false;
                    }
                    return true;
                  },
                },
                {
                  view: "datepicker",
                  label: "Date of Birth",
                  name: "dob",
                  format: "%Y-%m-%d",
                  bottomPadding: 20,
                  labelWidth: 150,
                },
                {
                  view: "textarea",
                  label: "Bio",
                  name: "bio",
                  height: 100,
                  placeholder: "Tell us about yourself",
                  bottomPadding: 20,
                  labelWidth: 150,
                },
              ],
            },
          ],
        },
        {
          margin: 10,
          cols: [
            { width: 150 }, // Spacer
            {
              view: "button",
              value: "Save Personal Info",
              css: "webix_primary",
              click: () => this.savePersonalInfo(),
            },
            {
              view: "button",
              value: "Cancel",
              css: "webix_secondary",
              click: () => this.cancelPersonalInfo(),
            },
          ],
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
          bottomPadding: 20,
          labelWidth: 150,
        },
        {
          view: "text",
          type: "password",
          label: "New Password",
          name: "new_password",
          bottomPadding: 20,
          labelWidth: 150,
        },
        {
          view: "text",
          type: "password",
          label: "Confirm Password",
          name: "confirm_password",
          bottomPadding: 20,
          labelWidth: 150,
        },
        {
          margin: 10,
          cols: [
            { width: 150 },
            {
              view: "button",
              value: "Save Security Settings",
              css: "webix_primary",
              click: () => this.saveSecuritySettings(),
            },
            {
              view: "button",
              value: "Cancel",
              css: "webix_secondary",
              click: () => this.cancelSecuritySettings(),
            },
          ],
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
        {
          id: "delete",
          header: "",
          template: "<span class='delete-btn webix_icon wxi-trash'></span>",
          width: 50,
        },
      ],
      data: [
        {
          id: 1,
          date: "2024-03-27",
          ip: "192.168.1.1",
          device: "Chrome, Windows",
        },
        { id: 2, date: "2024-03-26", ip: "10.0.0.1", device: "Safari, MacOS" },
      ],
      onClick: {
        "delete-btn": function (e, id) {
          this.remove(id); // Removes the entry
          return false;
        },
      },
    };
  }

  init() {
    this.loadUserData();
  }

  _handleProfilePicUpload(upload) {
    const file = upload.file;

    // Check if the file is an image (JPEG, PNG, or WebP)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (file && allowedTypes.includes(file.type)) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Set the profile image preview to the uploaded file
        $$("profile_pic_preview").setValues({
          profile_pic: e.target.result,
        });

        // Store the image in localStorage
        localStorage.setItem("profile_pic", e.target.result);
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
    } else {
      // Show an error message if the file type is not valid
      webix.message({
        text: "Only image files (JPEG, PNG, WebP) are allowed.",
        type: "error",
      });
    }

    return true; // Allow the file to be processed
  }

  removeProfilePhoto() {
    $$("profile_pic_preview").setValues({
      profile_pic: this.getDefaultAvatar(),
    });
    $$("profile_pic_uploader").clear();
    webix.message({
      text: "Profile photo removed successfully.",
      type: "info",
    });
  }

  getDefaultAvatar() {
    return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
      <circle cx='50' cy='50' r='45' fill='%23f0f0f0'/>
      <circle cx='50' cy='40' r='20' fill='%23888888'/>
      <path d='M20,80 Q50,95 80,80 Q50,110 20,80Z' fill='%23888888'/>
    </svg>`;
  }

  savePersonalInfo() {
    const formData = $$("account_settings_form").getValues();
    if (!formData.full_name || !formData.email) {
      webix.message({
        text: "Please fill in required fields",
        type: "error",
      });
      return;
    }
    if ($$("userForm").validate() == false) {
      webix.message("Please fill in the correct details.");
      return;
    }

    webix.message({
      text: "Personal Info saved successfully!",
      type: "success",
    });
    console.log("Saved Personal Info:", formData);
  }

  cancelPersonalInfo() {
    this.loadUserData();
    webix.message({
      text: "Personal Info changes cancelled",
      type: "info",
    });
  }

  // saveSecuritySettings() {
  //   const formData = $$("account_settings_form").getValues();
  //   // Implement saving security settings logic here
  //   webix.message({
  //     text: "Security settings saved successfully!",
  //     type: "success",
  //   });
  //   console.log("Saved Security Settings:", formData);
  // }

  saveSecuritySettings() {
    const formData = $$("account_settings_form").getValues();

    // Get the current, new, and confirm password values
    const currentPassword = formData.current_password;
    const newPassword = formData.new_password;
    const confirmPassword = formData.confirm_password;
    console.log(currentPassword, newPassword, confirmPassword);

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      webix.message({
        text: "New Password and Confirm Password do not match.",
        type: "error",
      });
      return;
    }

    // Password strength validation (e.g., at least 8 characters, contains both letters and numbers)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&+=]{8,}$/;
    // Minimum 8 characters, at least one letter and one number
    if (!passwordRegex.test(newPassword)) {
      webix.message({
        text: "Password must be at least 8 characters long and contain both letters and numbers.",
        type: "error",
      });
      return;
    }

    // Proceed with saving the security settings if validation passes
    webix.message({
      text: "Security settings saved successfully!",
      type: "success",
    });

    // Here, you would typically call an API to save the changes, e.g., saving the new password to the backend
    console.log("Saved Security Settings:", formData);
  }

  cancelSecuritySettings() {
    this.loadUserData();
    webix.message({
      text: "Security settings changes cancelled",
      type: "info",
    });
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
