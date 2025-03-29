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

  // _personalInfoTab() {
  //   return {
  //     rows: [
  //       {
  //         cols: [
  //           // Profile Picture Section
  //           {
  //             rows: [
  //               {
  //                 view: "template",
  //                 template: "Profile Picture",
  //                 type: "section",
  //               },
  //               {
  //                 view: "template",
  //                 id: "profile_pic_preview",
  //                 height: 200,
  //                 template: (obj) => `
  //                   <div style="display: flex; justify-content: center; align-items: center; height: 100%;">
  //                     <img src="${obj.profile_pic || this.getDefaultAvatar()}"
  //                          style="max-width: 200px; max-height: 200px; border-radius: 50%; object-fit: cover;"/>
  //                   </div>
  //                 `,
  //               },
  //               {
  //                 view: "uploader",
  //                 id: "profile_pic_uploader",
  //                 value: "Upload Picture",
  //                 accept: "image/jpeg,image/png,image/webp",
  //                 multiple: false,
  //                 upload: "/upload/profile",
  //                 on: {
  //                   onBeforeFileAdd: (file) =>
  //                     this._handleProfilePicUpload(file),
  //                 },
  //               },
  //               {
  //                 view: "button",
  //                 value: "Remove Profile Photo",
  //                 css: "webix_danger",
  //                 click: () => this.removeProfilePhoto(),
  //               },
  //             ],
  //             width: 250,
  //             padding: { right: 20 },
  //           },
  //           { width: 20 },
  //           // Personal Details Section

  //           {
  //             id: "userForm",
  //             rows: [
  //               {
  //                 view: "text",
  //                 label: "Full Name",
  //                 name: "full_name",
  //                 placeholder: "Enter full name",
  //                 bottomPadding: 20,
  //                 labelWidth: 150,
  //               },
  //               {
  //                 view: "text",
  //                 label: "Username",
  //                 name: "username",
  //                 placeholder: "Choose a username",
  //                 bottomPadding: 20,
  //                 labelWidth: 150,
  //               },
  //               {
  //                 view: "text",
  //                 label: "Email",
  //                 name: "email",
  //                 placeholder: "Enter email address",
  //                 bottomPadding: 20,
  //                 labelWidth: 150,
  //                 validate: webix.rules.isEmail,
  //                 invalidMessage: "Please enter a valid email address.",
  //               },
  //               {
  //                 view: "combo",
  //                 label: "Country Code",
  //                 id: "countryCode",
  //                 options: [
  //                   { id: "+1", value: "USA (+1)" },
  //                   { id: "+44", value: "UK (+44)" },
  //                   { id: "+91", value: "India (+91)" },
  //                   // Add more country codes as needed
  //                 ],
  //                 value: "+1", // Default country code
  //                 required: true,
  //               },
  //               {
  //                 view: "text",
  //                 label: "Mobile Number",
  //                 id: "mobileNumber",
  //                 name: "mobile",
  //                 placeholder: "Enter mobile number",
  //                 required: true,
  //                 invalidMessage: "Please enter a valid mobile number.",
  //                 validate: function (value) {
  //                   const countryCode = $$("countryCode").getValue();
  //                   let minLength = 10; // Default min length
  //                   let maxLength = 10; // Default max length

  //                   // Adjust lengths based on the country code
  //                   if (countryCode === "+1") {
  //                     minLength = maxLength = 10; // USA
  //                   } else if (countryCode === "+44") {
  //                     minLength = maxLength = 10; // UK
  //                   } else if (countryCode === "+91") {
  //                     minLength = 10; // India
  //                     maxLength = 10;
  //                   }

  //                   // Check length
  //                   if (value.length < minLength || value.length > maxLength) {
  //                     return false;
  //                   }
  //                   return true;
  //                 },
  //               },
  //               {
  //                 view: "datepicker",
  //                 label: "Date of Birth",
  //                 name: "dob",
  //                 format: "%Y-%m-%d",
  //                 bottomPadding: 20,
  //                 labelWidth: 150,
  //               },
  //               {
  //                 view: "textarea",
  //                 label: "Bio",
  //                 name: "bio",
  //                 height: 100,
  //                 placeholder: "Tell us about yourself",
  //                 bottomPadding: 20,
  //                 labelWidth: 150,
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       {
  //         margin: 10,
  //         cols: [
  //           { width: 150 }, // Spacer
  //           {
  //             view: "button",
  //             value: "Save Personal Info",
  //             css: "webix_primary",
  //             click: () => this.savePersonalInfo(),
  //           },
  //           {
  //             view: "button",
  //             value: "Cancel",
  //             css: "webix_secondary",
  //             click: () => this.cancelPersonalInfo(),
  //           },
  //         ],
  //       },
  //     ],
  //   };
  // }
  _personalInfoTab() {
    return {
      view: "scrollview",
      scroll: "y",
      body: {
        id: "mainLayout",
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
                view: "form",
                elements: [
                  {
                    view: "text",
                    label: "Full Name",
                    name: "full_name",
                    placeholder: "Enter full name",
                    bottomPadding: 20,
                    labelWidth: 150,
                    required: true,
                    invalidMessage: "Full Name is required.",
                  },
                  {
                    view: "text",
                    label: "Username",
                    name: "username",
                    placeholder: "Choose a username",
                    bottomPadding: 20,
                    labelWidth: 150,
                    required: true,
                    invalidMessage: "Username is required.",
                  },
                  {
                    view: "text",
                    label: "Email",
                    name: "email",
                    placeholder: "Enter email address",
                    bottomPadding: 20,
                    labelWidth: 150,
                    validate: webix.rules.isEmail,
                    required: true,
                    invalidMessage: "Please enter a valid email address.",
                  },
                  {
                    cols: [
                      {
                        view: "combo",
                        label: "Country Code",
                        id: "countryCode",
                        name: "country_code",
                        labelWidth: 150,
                        options: [
                          { id: "+1", value: "USA (+1)" },
                          { id: "+44", value: "UK (+44)" },
                          { id: "+91", value: "India (+91)" },
                          { id: "+61", value: "AUS (+61)" },
                          { id: "+94", value: "Sri Lanka (+94)" },
                        ],
                        value: "+61",
                      },
                      // {
                      //   view: "button",
                      //   value: "✎",
                      //   width: 30,
                      //   css: "webix_secondary",
                      //   click: function () {
                      //     $$("countryCode").enable();
                      //   },
                      // },
                    ],
                  },
                  {
                    view: "text",
                    label: "Mobile Number",
                    name: "mobile",
                    placeholder: "Enter mobile number",
                    required: true,
                    bottomPadding: 20,
                    labelWidth: 150,
                    validate: function (value) {
                      return this.validateMobileNumber(value);
                    }.bind(this),
                    invalidMessage: "Please enter a valid mobile number.",
                  },
                  {
                    cols: [
                      {
                        view: "datepicker",
                        label: "Date of Birth",
                        name: "dob",
                        format: "%Y-%m-%d",
                        bottomPadding: 20,
                        labelWidth: 150,
                      },
                      // {
                      //   view: "button",
                      //   value: "✎",
                      //   width: 30,
                      //   css: "webix_secondary",
                      //   click: function () {
                      //     $$("userForm").elements["dob"].enable();
                      //   },
                      // },
                    ],
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
                rules: {
                  full_name: webix.rules.isNotEmpty,
                  username: webix.rules.isNotEmpty,
                  email: webix.rules.isEmail,
                  mobile: function (value) {
                    return this.validateMobileNumber(value);
                  }.bind(this),
                },
              },
            ],
            on: {
              onAfterRender: function () {
                window.addEventListener("resize", () => this.adjustLayout());
                this.adjustLayout(); // Ensure layout is correct on initial load
              },
            },
          },
          {
            rows: [
              {
                cols: [
                  {},
                  {
                    view: "button",
                    value: "Edit ✎",
                    css: "webix_secondary",
                    click: () => this.enableFields(),
                    width: 100, // Ensures a consistent button size
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
                value: "Save",
                css: "webix_primary",
                click: () => this.savePersonalInfo(),
                hotkey: "enter",
              },
              {
                view: "button",
                value: "Cancel",
                css: "webix_secondary",
                click: () => this.cancelPersonalInfo(),
                hotkey: "esc",
              },
            ],
          },
        ],
        onClick: {
          // Click anywhere outside, disable all fields
          "*": () => this._disableAllFields(),
        },
      },
    };
  }

  /**
   * Helper function to create an editable text field with a small "Edit" button.
   */
  _createEditableField(
    label,
    name,
    validateRule = null,
    invalidMessage = null,
    isTextArea = false
  ) {
    return {
      cols: [
        {
          view: isTextArea ? "textarea" : "text",
          label: label,
          name: name,
          placeholder: `Enter ${label.toLowerCase()}`,
          bottomPadding: 20,
          labelWidth: 150,
          disabled: true,
          validate: validateRule,
          invalidMessage: invalidMessage,
        },
        {
          view: "button",
          value: "✎",
          width: 30,
          css: "webix_secondary",
          click: function () {
            $$("userForm").elements[name].enable();
          },
        },
      ],
    };
  }

  /**
   * Function to disable all form fields when clicking outside.
   */
  // _disableAllFields() {
  //   const form = $$("userForm");
  //   Object.keys(form.elements).forEach((key) => {
  //     form.elements[key].disable();
  //   });

  //   $$("profile_pic_uploader").disable();
  //   $$("remove_profile_btn").disable();
  //   $$("countryCode").disable();
  // }

  adjustLayout() {
    const layout = $$("mainLayout");
    if (window.innerWidth < 750) {
      layout.define("rows", [
        layout.getChildViews()[0], // Profile Picture Section
        layout.getChildViews()[1], // Personal Details Section
      ]);
    } else {
      layout.define("cols", [
        layout.getChildViews()[0], // Profile Picture Section
        { width: 20 }, // Spacer
        layout.getChildViews()[1], // Personal Details Section
      ]);
    }
    layout.refresh();
  }

  _securityTab() {
    return {
      rows: [
        this._passwordField("Current Password", "current_password"),
        this._passwordFieldWithStrength("New Password", "new_password"),
        this._passwordField("Confirm Password", "confirm_password"),
        {
          margin: 10,
          cols: [
            { width: 150 },
            {
              view: "button",
              value: "Save Security Settings",
              css: "webix_primary",
              click: () => this.saveSecuritySettings(),
              hotkey: "enter", // This enables the Enter key to trigger the button
            },
            {
              view: "button",
              value: "Cancel",
              css: "webix_secondary",
              click: () => this.cancelSecuritySettings(),
              hotkey: "esc",
            },
          ],
        },
      ],
    };
  }

  _passwordField(label, id) {
    return {
      cols: [
        {
          view: "text",
          type: "password",
          label: label,
          name: id,
          bottomPadding: 20,
          labelWidth: 150,
          id: id,
        },
        {
          view: "button",
          type: "icon",
          icon: "mdi mdi-eye-off",
          width: 50,
          id: `${id}_toggle`,
          click: () => this.togglePassword(id),
        },
      ],
    };
  }

  _passwordFieldWithStrength(label, id) {
    return {
      rows: [
        {
          cols: [
            {
              view: "text",
              type: "password",
              label: label,
              name: id,
              bottomPadding: 5,
              labelWidth: 150,
              id: id,
              on: {
                onTimedKeyPress: () => this.checkPasswordStrength(id),
              },
            },
            {
              view: "button",
              type: "icon",
              icon: "mdi mdi-eye-off",
              width: 50,
              id: `${id}_toggle`,
              click: () => this.togglePassword(id),
            },
          ],
        },
        {
          view: "template",
          id: `${id}_strength`,
          template: "Password Strength: <span style='color: gray;'>Weak</span>",
          height: 30,
        },
      ],
    };
  }

  togglePassword(fieldId) {
    const field = $$(`${fieldId}`);
    const button = $$(`${fieldId}_toggle`);
    const isPassword = field.config.type === "password";

    field.define("type", isPassword ? "text" : "password");
    button.define("icon", isPassword ? "mdi mdi-eye" : "mdi mdi-eye-off");

    field.refresh();
    button.refresh();
  }

  checkPasswordStrength(fieldId) {
    const password = $$(`${fieldId}`).getValue();
    const strengthTemplate = $$(`${fieldId}_strength`);

    let strength = "Weak";
    let color = "red";

    if (
      password.length > 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      strength = "Strong";
      color = "green";
    } else if (
      password.length > 5 &&
      (/[A-Z]/.test(password) || /\d/.test(password))
    ) {
      strength = "Medium";
      color = "orange";
    }

    strengthTemplate.define(
      "template",
      `Password Strength: <span style='color: ${color};'>${strength}</span>`
    );
    strengthTemplate.refresh();
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
    this.disableFields();
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

  // savePersonalInfo() {
  //   const formData = $$("account_settings_form").getValues();
  //   if (!formData.full_name || !formData.email) {
  //     webix.message({
  //       text: "Please fill in required fields",
  //       type: "error",
  //     });
  //     return;
  //   }
  //   // if ($$("userForm").validate() == false) {
  //   //   webix.message("Please fill in the correct details.");
  //   //   return;
  //   // }

  //   webix.message({
  //     text: "Personal Info saved successfully!",
  //     type: "success",
  //   });
  //   console.log("Saved Personal Info:", formData);
  // }

  savePersonalInfo() {
    const form = $$("userForm");
    const formData = form.getValues();

    if (!form.validate()) {
      const fields = form.getValues();

      // Iterate over each required field and apply red outline for errors
      Object.keys(fields).forEach((key) => {
        const field = $$("userForm").elements[key];
        if (field && field.config.required && !field.getValue()) {
          field.$view.style.border = "1px solid red"; // Red outline for empty required fields
        } else {
          field.$view.style.border = ""; // Remove red outline if field is valid
        }
      });
    }

    // Validation for required fields
    if (!formData.full_name) {
      webix.message({ text: "Full Name is required.", type: "error" });
      return;
    }

    if (!formData.email || !webix.rules.isEmail(formData.email)) {
      webix.message({
        text: "Please enter a valid email address.",
        type: "error",
      });
      return;
    }

    if (!formData.mobile || !this.validateMobileNumber(formData.mobile)) {
      webix.message({
        text: "Please enter a valid mobile number.",
        type: "error",
      });
      return;
    }

    this.disableFields();
    webix.message({
      text: "Personal Info saved successfully!",
      type: "success",
    });
    console.log("Saved Personal Info:", formData);
  }

  validateMobileNumber(mobileNumber) {
    const countryCode = $$("countryCode").getValue();
    let minLength = 10,
      maxLength = 10;

    // Set min & max length based on country code
    switch (countryCode) {
      case "+1": // USA
        minLength = maxLength = 10;
        break;
      case "+44": // UK
        minLength = maxLength = 10;
        break;
      case "+91": // India
        minLength = 10;
        maxLength = 10;
        break;
      default:
        minLength = 10;
        maxLength = 15; // Generic case
    }

    // Check if the number matches the required length and is numeric
    return (
      /^[0-9]+$/.test(mobileNumber) &&
      mobileNumber.length >= minLength &&
      mobileNumber.length <= maxLength
    );
  }

  // cancelPersonalInfo() {
  //   this.loadUserData();
  //   webix.message({
  //     text: "Personal Info changes cancelled",
  //     type: "info",
  //   });
  // }

  cancelPersonalInfo() {
    // Reset the form fields to the last saved user data
    const form = $$("userForm");
    const userData = this.loadUserData();

    if (!form.validate()) {
      const fields = form.getValues();
      Object.keys(fields).forEach((key) => {
        const field = $$("userForm").elements[key];

        field.$view.style.border = ""; // Remove red outline if field is valid
      });
    }
    if (userData) {
      $$("userForm").setValues(userData); // Restore previous values
    } else {
      $$("userForm").clear(); // If no data, clear form
    }

    // Reset the profile picture preview
    const profilePicPreview = $$("profile_pic_preview");
    if (profilePicPreview) {
      profilePicPreview.setValues({ profile_pic: this.getDefaultAvatar() });
    }

    webix.message({
      text: "Personal Info changes cancelled",
      type: "info",
    });
  }

  // Function to enable the form fields
  enableFields() {
    const form = $$("userForm");
    const fields = form.getValues();

    // Enable each field for editing
    Object.keys(fields).forEach((key) => {
      const field = $$("userForm").elements[key];
      if (field) {
        field.define("readonly", false); // Enable field for editing
        field.refresh();
      }
    });
  }
  // Function to disable the form fields without darkening them
  disableFields() {
    const form = $$("userForm");
    const fields = form.getValues();

    // Disable each field without darkening
    Object.keys(fields).forEach((key) => {
      const field = $$("userForm").elements[key];
      if (field) {
        field.define("readonly", true); // Disable field for editing
        field.refresh();
      }
    });

    // Show a message indicating the fields are disabled
    webix.message({
      text: "Fields are now non-editable.",
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
