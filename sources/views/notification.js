import { JetView } from "webix-jet";

export default class NotificationSettingsView extends JetView {
  config() {
    return {
      view: "form",
      id: "notification_settings",
      elements: [
        {
          view: "label",
          label: "Notification Channels",
          css: "section_header",
        },
        {
          rows: [
            {
              view: "switch",
              id: "email_notifications",
              name: "email_notifications",
              label: "Email Notifications",
              value: 1,
            },
            {
              view: "switch",
              id: "push_notifications",
              name: "push_notifications",
              label: "Push Notifications",
              value: 1,
            },
            {
              view: "switch",
              id: "sms_notifications",
              name: "sms_notifications",
              label: "SMS Notifications",
              value: 0,
            },
          ],
        },
        {
          view: "label",
          label: "Notification Frequency",
          css: "section_header",
        },
        {
          view: "radio",
          id: "notification_frequency",
          name: "notification_frequency",
          value: "instantly",
          options: [
            { id: "instantly", value: "Instantly" },
            { id: "daily", value: "Daily Summary" },
            { id: "weekly", value: "Weekly Summary" },
          ],
        },
        {
          view: "label",
          label: "Event-Based Preferences",
          css: "section_header",
        },
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
          labelRight: "Activity Alerts (Mentions, Messages, Friend Requests)",
        },
        {
          view: "button",
          value: "Save Notification Preferences",
          click: () => this.saveNotificationSettings(),
        },
      ],
      rules: {
        email_notifications: this.validateNotificationChannels,
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
