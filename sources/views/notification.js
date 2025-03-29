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
              },
              {
                view: "button",
                value: "Reset to Defaults",
                css: "webix_secondary",
                click: () => this.saveNotificationSettings(),
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

// // views/notification-settings.js
// import { JetView } from "webix-jet";

// export default class NotificationSettingsView extends JetView {
//   config() {
//     return {
//       view: "form",
//       id: "notificationForm",
//       scroll: true,
//       elementsConfig: {
//         labelPosition: "left",
//       },
//       elements: [
//         {
//           view: "template",
//           template:
//             "<h2 tabindex='0' class='settings-title'>Notification Settings</h2>",
//           css: "settings-title",
//         },
//         {
//           view: "fieldset",
//           label: "Alert Preferences",
//           body: {
//             paddingY: 10,
//             rows: [
//               {
//                 view: "checkbox",
//                 label: "Email",
//                 name: "email_notifications",
//                 labelWidth: 150,
//                 tooltip: "Receive notifications via email",
//                 tabFocus: true,
//               },
//               {
//                 view: "checkbox",
//                 label: "SMS",
//                 name: "sms_notifications",
//                 labelWidth: 150,
//                 tooltip: "Receive notifications via text message",
//                 tabFocus: true,
//               },
//               {
//                 view: "checkbox",
//                 label: "Push Notifications",
//                 name: "push_notifications",
//                 labelWidth: 150,
//                 tooltip: "Receive push notifications on your device",
//                 tabFocus: true,
//               },
//               {
//                 view: "checkbox",
//                 label: "Newsletter",
//                 name: "newsletter_subscriptions",
//                 labelWidth: 150,
//                 tooltip: "Receive newsletter emails",
//                 tabFocus: true,
//               },
//             ],
//           },
//         },
//         {
//           view: "fieldset",
//           label: "Sound Settings",
//           body: {
//             paddingY: 10,
//             rows: [
//               {
//                 cols: [
//                   {
//                     view: "combo",
//                     label: "Notification Sound",
//                     name: "notification_sound",
//                     labelWidth: 150,
//                     width: 300,
//                     options: [
//                       { id: "default", value: "Default" },
//                       { id: "chime", value: "Chime" },
//                       { id: "beep", value: "Beep" },
//                       { id: "silent", value: "Silent" },
//                     ],
//                     tabFocus: true,
//                     tooltip: "Choose your notification sound",
//                   },
//                   {
//                     view: "button",
//                     type: "icon",
//                     icon: "mdi mdi-play",
//                     width: 40,
//                     click: () => this.playTone(),
//                     tabFocus: true,
//                     tooltip: "Play notification tone sample",
//                     hotkey: "alt+1",
//                     css: "play-button",
//                   },
//                 ],
//               },
//               {
//                 view: "switch",
//                 label: "Sound Mode",
//                 name: "sound_mode",
//                 labelWidth: 150,
//                 onLabel: "Mute",
//                 offLabel: "Unmute",
//                 tabFocus: true,
//                 tooltip: "Configure sound mode",
//               },
//             ],
//           },
//         },
//         {
//           view: "fieldset",
//           label: "Preview Settings",
//           body: {
//             paddingY: 10,
//             rows: [
//               {
//                 view: "switch",
//                 label: "Text Preview",
//                 name: "text_preview",
//                 labelWidth: 150,
//                 onLabel: "On",
//                 offLabel: "Off",
//                 tabFocus: true,
//                 tooltip: "Show text previews in notifications",
//               },
//               {
//                 view: "switch",
//                 label: "Media Preview",
//                 name: "media_preview",
//                 labelWidth: 150,
//                 onLabel: "On",
//                 offLabel: "Off",
//                 tabFocus: true,
//                 tooltip: "Show media previews in notifications",
//               },
//               {
//                 view: "switch",
//                 label: "Mute All Notifications",
//                 name: "mute_notifications",
//                 labelWidth: 150,
//                 onLabel: "On",
//                 offLabel: "Off",
//                 tabFocus: true,
//                 tooltip: "Temporarily silence all notifications",
//               },
//             ],
//           },
//         },
//         {
//           margin: 20,
//           cols: [
//             {},
//             {
//               view: "button",
//               id: "reset_button",
//               value: "Reset to Default",
//               minWidth: 150,
//               maxWidth: 250,
//               css: "reset-button",
//               tabFocus: true,
//               tooltip: "Reset all settings to default values",
//               hotkey: "alt+r",
//               click: () => this.resetToDefault(),
//             },
//             {
//               view: "button",
//               id: "save_button",
//               value: "Save Changes",
//               minWidth: 150,
//               maxWidth: 250,
//               css: "webix_primary save-button",
//               tabFocus: true,
//               tooltip: "Save your notification settings",
//               hotkey: "alt+s",
//               click: () => this.saveChanges(),
//             },
//           ],
//         },
//       ],
//     };
//   }

//   init(view) {
//     const form = view.getChildViews()[0];

//     // Set default values
//     form.setValues({
//       email_notifications: true,
//       sms_notifications: false,
//       push_notifications: true,
//       newsletter_subscriptions: false,
//       notification_sound: "default",
//       sound_mode: "keep",
//       text_preview: true,
//       media_preview: true,
//       mute_notifications: false,
//     });

//     // Setup keyboard navigation
//     this.setupKeyboardNavigation(form);

//     // Responsive adjustments
//     this.setupResponsiveness();
//   }

//   setupKeyboardNavigation(form) {
//     if (webix.UIManager) {
//       webix.UIManager.addHotKey("tab", (view) => {
//         const next = webix.UIManager.getNext(view);
//         if (next) webix.UIManager.setFocus(next);
//       });

//       webix.UIManager.addHotKey("shift+tab", (view) => {
//         const prev = webix.UIManager.getPrev(view);
//         if (prev) webix.UIManager.setFocus(prev);
//       });

//       webix.UIManager.addHotKey("enter", (view) => {
//         if (view && view.config) {
//           if (view.config.view === "button") {
//             view.callEvent("onItemClick", []);
//           } else if (
//             view.config.view === "checkbox" ||
//             view.config.view === "switch"
//           ) {
//             view.setValue(!view.getValue());
//           }
//         }
//       });

//       // Focus the first element
//       if (form.getChildViews().length > 0) {
//         webix.UIManager.setFocus(form.getChildViews()[0]);
//       }
//     }
//   }

//   setupResponsiveness() {
//     window.addEventListener("resize", () => this.applyResponsiveLayout());
//     this.applyResponsiveLayout();
//   }

//   applyResponsiveLayout() {
//     const width = window.innerWidth;
//     const form = this.getRoot();

//     if (width <= 767) {
//       // Mobile view
//       form.define("elementsConfig", { labelPosition: "top" });
//       this.adjustButtonLayout(true);
//     } else if (width <= 991) {
//       // Tablet view
//       form.define("elementsConfig", { labelPosition: "left", labelWidth: 120 });
//       this.adjustButtonLayout(false);
//     } else {
//       // Desktop view
//       form.define("elementsConfig", { labelPosition: "left", labelWidth: 150 });
//       this.adjustButtonLayout(false);
//     }

//     form.refresh();
//   }

//   adjustButtonLayout(isVertical) {
//     const resetButton = this.getRoot().getChildViews()[4];

//     if (isVertical) {
//       resetButton.define("cols", []);
//       resetButton.define("rows", [
//         {},
//         {
//           view: "button",
//           id: "reset_button",
//           value: "Reset to Default",
//           css: "reset-button",
//         },
//         { height: 10 },
//         {
//           view: "button",
//           id: "save_button",
//           value: "Save Changes",
//           css: "webix_primary save-button",
//         },
//       ]);
//     } else {
//       resetButton.define("rows", []);
//       resetButton.define("cols", [
//         {},
//         {
//           view: "button",
//           id: "reset_button",
//           value: "Reset to Default",
//           width: 150,
//           css: "reset-button",
//         },
//         { width: 10 },
//         {
//           view: "button",
//           id: "save_button",
//           value: "Save Changes",
//           width: 150,
//           css: "webix_primary save-button",
//         },
//       ]);
//     }

//     resetButton.refresh();
//   }

//   resetToDefault() {
//     const form = this.getRoot();

//     form.clear();
//     form.setValues({
//       email_notifications: true,
//       sms_notifications: false,
//       push_notifications: true,
//       newsletter_subscriptions: false,
//       notification_sound: "default",
//       sound_mode: "keep",
//       text_preview: true,
//       media_preview: true,
//       mute_notifications: false,
//     });

//     webix.message("Settings reset to default");
//   }

//   saveChanges() {
//     const values = this.getRoot().getValues();
//     console.log("Saving settings:", values);

//     webix.message({
//       type: "success",
//       text: "Notification settings updated!",
//     });
//   }

//   playTone() {
//     const form = this.getRoot();
//     const tone = form.getValues().notification_sound;

//     webix.message(`Playing ${tone} message tone`);

//     try {
//       const audio = new Audio(`/sounds/${tone.toLowerCase()}.mp3`);
//       audio.play().catch((e) => console.error("Error playing sound:", e));
//     } catch (e) {
//       console.error("Error with audio playback:", e);
//     }
//   }
// }
