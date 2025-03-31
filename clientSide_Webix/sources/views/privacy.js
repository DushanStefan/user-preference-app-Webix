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

                options: [
                  { id: "public", value: "Public - Visible to everyone" },
                  { id: "friends", value: "Friends Only" },
                  { id: "private", value: "Private - Only me" },
                ],
                value: "friends",
                vertical: true,
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
              {
                view: "checkbox",
                name: "activeStatus",
                labelRight: "Show my active status",
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
          margin: 10,
          cols: [
            { width: 150 }, // Spacer
            {
              view: "button",
              value: "Save Privacy Settings",
              css: "webix_primary",
              click: () => this.savePrivacySettings(),
            },
            {
              view: "button",
              value: "Reset to default",
              css: "webix_secondary",
              click: () => this.cancelPrivacyInfo(),
            },
          ],
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

    webix.message({
      type: "success",
      text: "Privacy settings updated successfully",
    });

   
  }

  cancelPrivacyInfo() {
    if (result) {
      // Reset profile picture settings
      $$("profile-picture-settings").setValues({
        profile_pic_visibility: "everyone",
        profile_pic_download: "everyone",
      });

      // Reset account privacy settings
      $$("account-privacy").setValues({
        account_privacy: "public",
        connection_requests: "everyone",
      });

      // Reset data sharing preferences
      $$("data-sharing-preferences").setValues({
        search_engine_visibility: 0,
        third_party_access: 0,
        active_status_visibility: 0,
        profile_view_tracking: 0,
      });

      // Reset advanced privacy controls
      $$("advanced-privacy-controls").setValues({
        data_retention: "1_month",
        data_export: "full",
      });

      webix.message({
        type: "success",
        text: "Privacy settings reset to default!",
      });
    }
  }
  requestPersonalData() {
    // Simulate data request process
    webix.confirm({
      title: "Request Personal Data",
      text: "Are you sure you want to request a copy of your personal data?",
      callback: (result) => {
        webix.message({
          type: "success",
          text: "Your personal data request has been submitted. We'll process it soon.",
        });

        
      },
    });
  }

  requestAccountDeletion() {
    // Simulate account deletion request process
    webix.confirm({
      title: "Account Deletion",
      text: "Are you absolutely sure you want to request account deletion? This action cannot be undone.",
      callback: (result) => {
        webix.message({
          type: "success",
          text: "Your account deletion request has been submitted.",
        });
        localStorage.clear(); // This clears all localStorage data
        this.app.show("/home");

        
      },
    });
  }
}
