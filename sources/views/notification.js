// import { JetView } from "webix-jet";

// export default class NotificationSettingsView extends JetView {
//   config() {
//     return {
//       view: "form",
//       id: "notificationSettingsForm",
//       width: 400,
//       elements: [
//         {
//           view: "checkbox",
//           label: "Email Notifications",
//           name: "email_notifications",
//           labelWidth: 180,
//         },
//         {
//           view: "checkbox",
//           label: "Push Notifications",
//           name: "push_notifications",
//           labelWidth: 180,
//         },
//         {
//           view: "richselect",
//           label: "Notification Frequency",
//           name: "notification_frequency",
//           options: [
//             { id: "immediate", value: "Immediate" },
//             { id: "daily", value: "Daily" },
//             { id: "weekly", value: "Weekly" },
//           ],
//           labelWidth: 180,
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
//     };
//   }

//   saveData() {
//     const form = this.getRoot();
//     if (form.validate()) {
//       webix.message({
//         type: "success",
//         text: "Notification settings saved successfully",
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
//----------------------------------
// import { JetView } from "webix-jet";

// export default class NotificationSettingsView extends JetView {
//   config() {
//     return {
//       view: "form",
//       id: "notificationSettingsForm",
//       elements: [
//         {
//           view: "checkbox",
//           label: "Email Notifications",
//           name: "email_notifications",
//         },
//         {
//           view: "checkbox",
//           label: "Push Notifications",
//           name: "push_notifications",
//         },
//         {
//           view: "richselect",
//           label: "Notification Frequency",
//           name: "notification_frequency",
//           options: [
//             { id: "immediate", value: "Immediate" },
//             { id: "daily", value: "Daily" },
//             { id: "weekly", value: "Weekly" },
//           ],
//         },
//         { view: "button", value: "Save", click: () => this.saveData() },
//       ],
//       rules: {},
//     };
//   }

//   saveData() {
//     const form = this.getRoot();
//     if (form.validate()) {
//       webix.message("Notification settings saved successfully");
//     } else {
//       webix.message({
//         type: "error",
//         text: "Please check the form for errors.",
//       });
//     }
//   }
// }

import { JetView } from "webix-jet";

export default class NotificationSettingsView extends JetView {
  config() {
    return {
      view: "form",
      id: "notificationSettingsForm",
      elemHeight: 500,
      width: "auto",
      elements: [
        {
          view: "template",
          template: "Notification Preferences",
          type: "section",
        },
        {
          margin: 10,
          rows: [
            // Email Notification Section
            {
              view: "fieldset",
              label: "Email Notifications",
              body: {
                rows: [
                  {
                    view: "checkbox",
                    labelRight: "Enable Email Notifications",
                    name: "emailNotificationsEnabled",
                    id: "emailNotificationsEnabled",
                    value: true,
                  },
                  {
                    view: "label",
                    label: "Notification Frequency",
                    align: "left",
                  },
                  {
                    view: "radio",
                    id: "emailNotificationFrequency",
                    name: "emailNotificationFrequency",
                    vertical: true,
                    options: [
                      { id: "immediate", value: "Immediately" },
                      { id: "daily", value: "Daily Digest" },
                      { id: "weekly", value: "Weekly Summary" },
                      { id: "never", value: "Never" },
                    ],
                    value: "daily",
                  },
                ],
              },
            },
            { height: 10 }, // Spacer
            // Push Notification Section
            {
              view: "fieldset",
              label: "Push Notifications",
              body: {
                rows: [
                  {
                    view: "checkbox",
                    labelRight: "Enable Push Notifications",
                    name: "pushNotificationsEnabled",
                    id: "pushNotificationsEnabled",
                    value: true,
                  },
                  {
                    view: "label",
                    label: "Notification Categories",
                    align: "left",
                  },
                  {
                    view: "multiselect",
                    id: "pushNotificationCategories",
                    name: "pushNotificationCategories",
                    placeholder: "Select notification types",
                    options: [
                      { id: "account", value: "Account Activity" },
                      { id: "updates", value: "Product Updates" },
                      { id: "promotions", value: "Promotions" },
                      { id: "security", value: "Security Alerts" },
                    ],
                  },
                  {
                    view: "label",
                    label: "Notification Frequency",
                    align: "left",
                  },
                  {
                    view: "radio",
                    id: "pushNotificationFrequency",
                    name: "pushNotificationFrequency",
                    vertical: true,
                    options: [
                      { id: "realtime", value: "Real-time" },
                      { id: "hourly", value: "Hourly" },
                      { id: "daily", value: "Daily" },
                      { id: "never", value: "Never" },
                    ],
                    value: "hourly",
                  },
                ],
              },
            },
            {
              margin: 10,
              cols: [
                {
                  view: "button",
                  value: "Save Notification Preferences",
                  css: "webix_primary",
                  click: () => this.saveNotificationSettings(),
                },
                {
                  view: "button",
                  value: "Reset",
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
    // Load initial notification settings
    this.loadNotificationSettings();
  }

  loadNotificationSettings() {
    // Simulated data loading - replace with actual API call
    const notificationSettings = {
      emailNotificationsEnabled: true,
      emailNotificationFrequency: "daily",
      pushNotificationsEnabled: true,
      pushNotificationFrequency: "hourly",
      pushNotificationCategories: ["account", "security"],
    };

    $$("notificationSettingsForm").setValues(notificationSettings);
  }

  saveNotificationSettings() {
    const form = $$("notificationSettingsForm");
    const formData = form.getValues();

    // Additional validation if needed
    if (
      !formData.emailNotificationsEnabled &&
      !formData.pushNotificationsEnabled
    ) {
      webix.message({
        type: "error",
        text: "At least one notification type must be enabled",
      });
      return;
    }

    // Simulated save process - replace with actual API call
    try {
      console.log("Saving notification settings:", formData);

      webix.message({
        type: "success",
        text: "Notification preferences updated successfully!",
      });
    } catch (error) {
      webix.message({
        type: "error",
        text: "Failed to update notification settings",
      });
    }
  }

  resetForm() {
    // Reload original notification settings
    this.loadNotificationSettings();

    webix.message({
      type: "info",
      text: "Notification settings reset to original values",
    });
  }
}
