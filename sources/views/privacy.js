import { JetView } from "webix-jet";

export default class PrivacySettingsView extends JetView {
  config() {
    return {
      view: "form",
      id: "privacySettingsForm",
      elements: [
        {
          view: "fieldset",
          label: "Profile Visibility",
          body: {
            rows: [
              {
                view: "radio",
                name: "profileVisibility",
                label: "Who can see my profile?",
                options: [
                  { id: "public", value: "Public - Visible to everyone" },
                  { id: "friends", value: "Friends Only" },
                  { id: "private", value: "Private - Only me" },
                ],
                value: "friends",
              },
            ],
          },
        },
        {
          view: "fieldset",
          label: "Data Sharing Preferences",
          body: {
            rows: [
              {
                view: "checkbox",
                name: "sharePersonalInfo",
                labelRight:
                  "Allow sharing of personal information with third-party services",
                value: 0,
              },
              {
                view: "checkbox",
                name: "marketingCommunications",
                labelRight:
                  "Receive marketing communications and promotional offers",
                value: 0,
              },
              {
                view: "checkbox",
                name: "analyticsTracking",
                labelRight: "Allow usage analytics and tracking",
                value: 0,
              },
            ],
          },
        },
        {
          view: "fieldset",
          label: "Data Access and Deletion",
          body: {
            rows: [
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
          },
        },
        {
          view: "button",
          value: "Save Privacy Settings",
          css: "webix_primary",
          click: () => this.savePrivacySettings(),
        },
      ],
    };
  }

  init() {
    // Load initial privacy settings
    this.loadPrivacySettings();
  }

  loadPrivacySettings() {
    // Simulated data loading - replace with actual API call
    const privacyData = {
      profileVisibility: "friends",
      sharePersonalInfo: 0,
      marketingCommunications: 0,
      analyticsTracking: 0,
    };
    this.getRoot().setValues(privacyData);
  }

  savePrivacySettings() {
    const form = this.getRoot();
    const formData = form.getValues();

    // Simulate save process - replace with actual API call
    webix
      .ajax()
      .post("/api/privacy/update", formData)
      .then(() => {
        webix.message({
          type: "success",
          text: "Privacy settings updated successfully",
        });
      })
      .fail(() => {
        webix.message({
          type: "error",
          text: "Failed to update privacy settings",
        });
      });
  }

  requestPersonalData() {
    // Simulate data request process
    webix.confirm({
      title: "Request Personal Data",
      text: "Are you sure you want to request a copy of your personal data?",
      callback: (result) => {
        if (result) {
          webix
            .ajax()
            .post("/api/privacy/request-data")
            .then(() => {
              webix.message({
                type: "success",
                text: "Your personal data request has been submitted. We'll process it soon.",
              });
            })
            .fail(() => {
              webix.message({
                type: "error",
                text: "Failed to submit data request. Please try again.",
              });
            });
        }
      },
    });
  }

  requestAccountDeletion() {
    // Simulate account deletion request process
    webix.confirm({
      title: "Account Deletion",
      text: "Are you absolutely sure you want to request account deletion? This action cannot be undone.",
      callback: (result) => {
        if (result) {
          webix
            .ajax()
            .post("/api/privacy/request-deletion")
            .then(() => {
              webix.message({
                type: "success",
                text: "Your account deletion request has been submitted.",
              });
            })
            .fail(() => {
              webix.message({
                type: "error",
                text: "Failed to submit deletion request. Please try again.",
              });
            });
        }
      },
    });
  }
}
