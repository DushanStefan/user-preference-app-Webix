// import { JetView } from "webix-jet";

// export default class NotificationSettingsView extends JetView {
//   config() {
//     return {
//       view: "scrollview",
//       scroll: "y",
//       body: {
//         view: "form",
//         id: "notification_settings",
//         elements: [
//           {
//             view: "fieldset",
//             label: "Notification Channels",
//             css: "section_header",

//             body: {
//               rows: [
//                 {
//                   view: "switch",
//                   id: "email_notifications",
//                   name: "email_notifications",
//                   label: "Email Notifications",
//                   labelWidth: 150,
//                   tooltip: "Receive notifications via email",
//                   value: 1,
//                   on: {
//                     onChange: (newValue) => this.saveEmailNot(newValue),
//                   },
//                 },
//                 {
//                   view: "switch",
//                   id: "push_notifications",
//                   name: "push_notifications",
//                   label: "Push Notifications",
//                   labelWidth: 150,
//                   tooltip: "Receive push notifications on your device",
//                   value: 1,
//                   on: {
//                     onChange: (newValue) => this.savepushNot(newValue),
//                   },
//                 },
//                 {
//                   view: "switch",
//                   id: "sms_notifications",
//                   name: "sms_notifications",
//                   label: "SMS Notifications",
//                   labelWidth: 150,
//                   tooltip: "Receive notifications via text message",
//                   value: 0,
//                   on: {
//                     onChange: (newValue) => this.saveMessageNot(newValue),
//                   },
//                 },
//               ],
//             },
//           },
//           {
//             view: "fieldset",
//             label: "Notification Frequency",
//             css: "section_header",
//             id: "not_freq",
//             on: {
//               onChange: (newValue) => this.saveNotFreq(newValue),
//             },

//             body: {
//               view: "radio",
//               id: "notification_frequency",
//               name: "notification_frequency",
//               value: "instantly",
//               on: {
//                 onChange: (newValue) => this.saveEmailNot(newValue),
//               },

//               options: [
//                 {
//                   id: "instantly",
//                   value: "Instantly",
//                 },
//                 {
//                   id: "daily",
//                   value: "Daily Summary",
//                 },
//                 {
//                   id: "weekly",
//                   value: "Weekly Summary",
//                 },
//               ],
//             },
//           },
//           {
//             view: "fieldset",
//             label: "Event-Based Preferences",
//             css: "section_header",
//             body: {
//               rows: [
//                 {
//                   view: "checkbox",
//                   id: "marketing_emails",
//                   name: "marketing_emails",
//                   labelRight: "Marketing Emails (Promotions & Announcements)",
//                   on: {
//                     onChange: (newValue) => this.saveEmailNot(newValue),
//                   },
//                 },
//                 {
//                   view: "checkbox",
//                   id: "security_alerts",
//                   name: "security_alerts",
//                   labelRight:
//                     "Security Alerts (Login from new device, password change)",
//                   on: {
//                     onChange: (newValue) => this.saveEmailNot(newValue),
//                   },
//                 },
//                 {
//                   view: "checkbox",
//                   id: "activity_alerts",
//                   name: "activity_alerts",
//                   labelRight:
//                     "Activity Alerts (Mentions, Messages, Friend Requests)",
//                   on: {
//                     onChange: (newValue) => this.saveEmailNot(newValue),
//                   },
//                 },
//               ],
//             },
//           },
//           {
//             view: "fieldset",
//             label: "Sound Settings",
//             body: {
//               rows: [
//                 {
//                   cols: [
//                     {
//                       view: "combo",
//                       label: "Notification Sound",
//                       labelWidth: 150,
//                       name: "notification_sound",
//                       // labelWidth: 150,
//                       // width: 300,
//                       options: [
//                         { id: "default", value: "Default" },
//                         { id: "drop", value: "Drop" },
//                         { id: "beep", value: "Beep" },
//                         { id: "silent", value: "Silent" },
//                       ],
//                       tabFocus: true,
//                       tooltip: "Choose your notification sound",
//                       on: {
//                         onChange: (newValue) => this.saveEmailNot(newValue),
//                       },
//                     },
//                     {
//                       view: "button",
//                       type: "icon",
//                       icon: "mdi mdi-play",
//                       width: 40,
//                       click: "playTone",
//                       tabFocus: true,
//                       tooltip: "Play notification tone sample",
//                       hotkey: "alt+1",
//                       css: "play-button",
//                     },
//                   ],
//                 },
//                 {
//                   view: "switch",
//                   label: "Sound Mode",
//                   name: "sound_mode",
//                   labelWidth: 150,
//                   onLabel: "Mute",
//                   offLabel: "Unmute",

//                   tabFocus: true,
//                   tooltip: "Configure sound mode",
//                   on: {
//                     onChange: (newValue) => this.saveEmailNot(newValue),
//                   },
//                 },
//               ],
//             },
//           },
//           // Save Button

//           {
//             margin: 10,
//             cols: [
//               { width: 150 }, // Spacer
//               {
//                 view: "button",
//                 value: "Save Notification Preferences",
//                 css: "webix_primary",
//                 click: () => this.saveNotificationSettings(),
//                 hotkey: "enter",
//               },
//               {
//                 view: "button",
//                 value: "Reset to Defaults",
//                 css: "webix_secondary",
//                 click: () => this.saveNotificationSettings(),
//                 hotkey: "esc",
//               },
//             ],
//           },
//           // {
//           //   view: "button",
//           //   value: "Save Notification Preferences",
//           //   click: () => this.saveNotificationSettings(),
//           // },
//         ],
//         rules: {
//           email_notifications: this.validateNotificationChannels,
//         },
//       },
//     };
//   }

//   init() {
//     const savedEmailNotifications = localStorage.getItem("Email_notifications");
//     const savedMessageNotifications = localStorage.getItem(
//       "Message_notifications"
//     );
//     const savedPushNotifications = localStorage.getItem("Push_notifications");

//     if (savedEmailNotifications) {
//       this.saveEmailNot(savedEmailNotifications);
//       $$("email_notifications").setValue(savedEmailNotifications);
//     }

//     if (savedMessageNotifications) {
//       this.saveMessageNot(savedMessageNotifications);
//       $$("sms_notifications").setValue(savedMessageNotifications);
//     }

//     if (savedPushNotifications) {
//       this.savePushNot(savedPushNotifications);
//       $$("push_notifications").setValue(savedPushNotifications);
//     }

//     const savednot_freq = localStorage.getItem("Not_freq");
//     if (savednot_freq) {
//       this.saveNotFreq(savednot_freq); // Apply saved font size
//       $$("not_freq").setValue(savednot_freq); // Set the value of the slider
//     }
//     // Add event listeners for notification toggles
//     const notificationToggles = [
//       "email_notifications",
//       "push_notifications",
//       "sms_notifications",
//     ];

//     notificationToggles.forEach((toggle) => {
//       $$(toggle).attachEvent("onChange", () =>
//         this.validateNotificationChannels()
//       );
//     });

//     const storedState = webix.storage.local.get("notificationSettings");
//     if (storedState) {
//       $$("notification_settings").setValues(storedState);
//     }

//     // // Restore the stored state when the view initializes
//     // const storedState = this.getParam("savedState", true);
//     // if (storedState) {
//     //   $$("notification_settings").setValues(storedState);
//     // }
//   }

//   validateNotificationChannels() {
//     const emailToggle = $$("email_notifications").getValue();
//     const pushToggle = $$("push_notifications").getValue();
//     const smsToggle = $$("sms_notifications").getValue();

//     // Check if all toggles are off
//     if (!(emailToggle || pushToggle || smsToggle)) {
//       webix.message({
//         type: "error",
//         text: "At least one notification channel must be active!",
//       });

//       // Revert the last toggle to on
//       // localStorage.setItem("Email_notifications", 1);
//       $$("email_notifications").setValue(1);
//       return false;
//     }
//     return true;
//   }

//   saveNotificationSettings() {
//     if (!this.validateNotificationChannels()) return;

//     const settings = {
//       emailNotifications: $$("email_notifications").getValue(),
//       pushNotifications: $$("push_notifications").getValue(),
//       smsNotifications: $$("sms_notifications").getValue(),
//       frequency: $$("notification_frequency").getValue(),
//       marketingEmails: $$("marketing_emails").getValue(),
//       securityAlerts: $$("security_alerts").getValue(),
//       activityAlerts: $$("activity_alerts").getValue(),
//       soundMode: $$("sound_mode").getValue(),
//       notificationSound: $$("notification_sound").getValue(),
//     };

//     // const settings1 = $$("notification_settings").getValues();
//     // this.setParam("savedState", settings1, true); // Save state persistently
//     // webix.message("Notification preferences saved!");

//     // const settings1 = $$("notification_settings").getValues();
//     // webix.storage.local.put("notificationSettings", settings1);
//     // webix.message("Notification preferences saved!");

//     // Simulate sending a push notification
//     this.sendNotificationPreviewPush(settings);

//     // Here you would typically send the settings to your backend
//     webix.message({
//       type: "success",
//       text: "Notification preferences saved successfully!",
//     });
//   }

//   sendNotificationPreviewPush(settings) {
//     // Simulated push notification
//     webix.message({
//       type: "info",
//       text:
//         "Notification Settings Updated:\n" +
//         `Email: ${settings.emailNotifications ? "ON" : "OFF"}\n` +
//         `Push: ${settings.pushNotifications ? "ON" : "OFF"}\n` +
//         `SMS: ${settings.smsNotifications ? "ON" : "OFF"}\n` +
//         `Frequency: ${settings.frequency}`,
//     });
//   }

//   saveEmailNot(value) {
//     localStorage.setItem("Email_notifications", value);
//   }

//   saveMessageNot(value) {
//     localStorage.setItem("Message_notifications", value);
//   }

//   savePushNot(value) {
//     localStorage.setItem("Push_notifications", value);
//   }

//   adjustFontSize(size) {
//     document.documentElement.style.setProperty("--font-size", `${size}px`);
//     localStorage.setItem("fontSize", size); // Save for future sessions
//   }

//   saveNotFreq(size) {
//     localStorage.setItem("Not_freq", size); // Save for future sessions
//   }
// }

import { JetView } from "webix-jet";

export default class NotificationSettingsView extends JetView {
  config() {
    return {
      view: "scrollview",
      scroll: "y",
      body: {
        view: "form",
        id: "notification_settings",
        elements: [
          {
            view: "fieldset",
            label: "Notification Channels",
            css: "section_header",

            body: {
              rows: [
                {
                  view: "switch",
                  id: "email_notifications",
                  name: "email_notifications",
                  label: "Email Notifications",
                  labelWidth: 150,
                  tooltip: "Receive notifications via email",
                  value: 1,
                },
                {
                  view: "switch",
                  id: "push_notifications",
                  name: "push_notifications",
                  label: "Push Notifications",
                  labelWidth: 150,
                  tooltip: "Receive push notifications on your device",
                  value: 1,
                },
                {
                  view: "switch",
                  id: "sms_notifications",
                  name: "sms_notifications",
                  label: "SMS Notifications",
                  labelWidth: 150,
                  tooltip: "Receive notifications via text message",
                  value: 0,
                },
              ],
            },
          },
          {
            view: "fieldset",
            label: "Notification Frequency",
            css: "section_header",
            body: {
              view: "radio",
              id: "notification_frequency",
              name: "notification_frequency",
              value: "instantly",

              options: [
                {
                  id: "instantly",
                  value: "Instantly",
                },
                {
                  id: "daily",
                  value: "Daily Summary",
                },
                {
                  id: "weekly",
                  value: "Weekly Summary",
                },
              ],
            },
          },
          {
            view: "fieldset",
            label: "Event-Based Preferences",
            css: "section_header",
            body: {
              rows: [
                {
                  view: "checkbox",
                  id: "marketing_emails",
                  name: "marketing_emails",
                  labelRight: "Marketing Emails (Promotions & Announcements)",
                },
                {
                  view: "checkbox",
                  id: "security_alerts",
                  name: "security_alerts",
                  labelRight:
                    "Security Alerts (Login from new device, password change)",
                },
                {
                  view: "checkbox",
                  id: "activity_alerts",
                  name: "activity_alerts",
                  labelRight:
                    "Activity Alerts (Mentions, Messages, Friend Requests)",
                },
              ],
            },
          },
          {
            view: "fieldset",
            label: "Sound Settings",
            body: {
              rows: [
                {
                  cols: [
                    {
                      view: "combo",
                      label: "Notification Sound",
                      labelWidth: 150,
                      name: "notification_sound",
                      // labelWidth: 150,
                      // width: 300,
                      options: [
                        { id: "default", value: "Default" },
                        { id: "drop", value: "Drop" },
                        { id: "beep", value: "Beep" },
                        { id: "silent", value: "Silent" },
                      ],
                      tabFocus: true,
                      tooltip: "Choose your notification sound",
                    },
                    {
                      view: "button",
                      type: "icon",
                      icon: "mdi mdi-play",
                      width: 40,
                      click: "playTone",
                      tabFocus: true,
                      tooltip: "Play notification tone sample",
                      hotkey: "alt+1",
                      css: "play-button",
                    },
                  ],
                },
                {
                  view: "switch",
                  label: "Sound Mode",
                  name: "sound_mode",
                  labelWidth: 150,
                  onLabel: "Mute",
                  offLabel: "Unmute",

                  tabFocus: true,
                  tooltip: "Configure sound mode",
                },
              ],
            },
          },
          // Save Button

          {
            margin: 10,
            cols: [
              { width: 150 }, // Spacer
              {
                view: "button",
                value: "Save Notification Preferences",
                css: "webix_primary",
                click: () => this.saveNotificationSettings(),
                hotkey: "enter",
              },
              {
                view: "button",
                value: "Reset to Defaults",
                css: "webix_secondary",
                click: () => this.saveNotificationSettings(),
                hotkey: "esc",
              },
            ],
          },
          // {
          //   view: "button",
          //   value: "Save Notification Preferences",
          //   click: () => this.saveNotificationSettings(),
          // },
        ],
        rules: {
          email_notifications: this.validateNotificationChannels,
        },
      },
    };
  }

  init() {
    // Add event listeners for notification toggles
    const notificationToggles = [
      "email_notifications",
      "push_notifications",
      "sms_notifications",
    ];

    notificationToggles.forEach((toggle) => {
      $$(toggle).attachEvent("onChange", () =>
        this.validateNotificationChannels()
      );
    });

    const storedState = webix.storage.local.get("notificationSettings");
    if (storedState) {
      $$("notification_settings").setValues(storedState);
    }

    // // Restore the stored state when the view initializes
    // const storedState = this.getParam("savedState", true);
    // if (storedState) {
    //   $$("notification_settings").setValues(storedState);
    // }
  }

  validateNotificationChannels() {
    const emailToggle = $$("email_notifications").getValue();
    const pushToggle = $$("push_notifications").getValue();
    const smsToggle = $$("sms_notifications").getValue();

    // Check if all toggles are off
    if (!(emailToggle || pushToggle || smsToggle)) {
      webix.message({
        type: "error",
        text: "At least one notification channel must be active!",
      });

      // Revert the last toggle to on
      $$("email_notifications").setValue(1);
      return false;
    }
    return true;
  }

  saveNotificationSettings() {
    if (!this.validateNotificationChannels()) return;

    const settings = {
      emailNotifications: $$("email_notifications").getValue(),
      pushNotifications: $$("push_notifications").getValue(),
      smsNotifications: $$("sms_notifications").getValue(),
      frequency: $$("notification_frequency").getValue(),
      marketingEmails: $$("marketing_emails").getValue(),
      securityAlerts: $$("security_alerts").getValue(),
      activityAlerts: $$("activity_alerts").getValue(),
      soundMode: $$("sound_mode").getValue(),
      notificationSound: $$("notification_sound").getValue(),
    };

    // const settings1 = $$("notification_settings").getValues();
    // this.setParam("savedState", settings1, true); // Save state persistently
    // webix.message("Notification preferences saved!");

    // const settings1 = $$("notification_settings").getValues();
    // webix.storage.local.put("notificationSettings", settings1);
    // webix.message("Notification preferences saved!");

    // Simulate sending a push notification
    this.sendNotificationPreviewPush(settings);

    // Here you would typically send the settings to your backend
    webix.message({
      type: "success",
      text: "Notification preferences saved successfully!",
    });
  }

  sendNotificationPreviewPush(settings) {
    // Simulated push notification
    webix.message({
      type: "info",
      text:
        "Notification Settings Updated:\n" +
        `Email: ${settings.emailNotifications ? "ON" : "OFF"}\n` +
        `Push: ${settings.pushNotifications ? "ON" : "OFF"}\n` +
        `SMS: ${settings.smsNotifications ? "ON" : "OFF"}\n` +
        `Frequency: ${settings.frequency}`,
    });
  }
}
