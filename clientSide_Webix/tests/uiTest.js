import { JetView } from "webix-jet";

export default class SecuritySettingsView extends JetView {
  config() {
    return {
      rows: [
        {
          view: "button",
          value: "Cancel",
          css: "webix_secondary",
          hotkey: "esc",
          click: () => this.cancelSecuritySettings(),
        },
        {
          view: "button",
          type: "icon",
          icon: "mdi mdi-eye-off",
          width: 50,
          id: "password_toggle",
          click: () => this.togglePassword("password_field"),
        },
        {
          view: "button",
          value: "Request Personal Data",
          css: "webix_secondary",
          click: () => this.requestPersonalData(),
        },
        {
          view: "button",
          value: "Request Account Deletion",
          css: "webix_danger",
          click: () => this.requestAccountDeletion(),
        },
      ],
    };
  }

  cancelSecuritySettings() {
    webix.message({
      text: "Security settings changes cancelled",
      type: "info",
    });
  }

  togglePassword(fieldId) {
    const field = $$(fieldId);
    const button = $$("password_toggle");
    const isPassword = field.config.type === "password";

    field.define("type", isPassword ? "text" : "password");
    button.define("icon", isPassword ? "mdi mdi-eye" : "mdi mdi-eye-off");
    field.refresh();
    button.refresh();
  }

  requestPersonalData() {
    webix.confirm({
      title: "Request Personal Data",
      text: "Are you sure you want to request a copy of your personal data?",
      callback: (result) => {
        if (result) {
          webix.message({
            type: "success",
            text: "Your personal data request has been submitted. We'll process it soon.",
          });
        }
      },
    });
  }

  requestAccountDeletion() {
    webix.confirm({
      title: "Request Account Deletion",
      text: "Are you sure you want to delete your account? This action is irreversible!",
      callback: (result) => {
        if (result) {
          webix.message({
            type: "danger",
            text: "Your account deletion request has been submitted.",
          });
        }
      },
    });
  }
}
