import { JetView } from "webix-jet";
import { Navbar } from "./toolbar";

export default class HelpPage extends JetView {
  config() {
    // const isLogin = JSON.parse(localStorage.getItem("loggedUser")) === true;

    return {
      rows: [
        Navbar,
        {
          type: "space",
          rows: [
            {
              template: `
                <div style=" padding: 20px;">
                  <h2 style="color: #4A90E2;">Help</h2>
                  <p style="font-size: 18px; color: #333;">If you need assistance, check our FAQs or contact support for further help.</p>
                </div>
              `,
              autoheight: true,
              css: "webix_shadow_medium",
            },
            {
              template: `
                <div style="padding: 20px;">
                  <h2 style="color: #4A90E2;">Support</h2>
                  <p style="font-size: 16px; color: #333;">Our support team is available 24/7 to assist you with any issues. You can contact us via email or phone.</p>
                </div>
              `,
              autoheight: true,
              css: "webix_shadow_medium",
            },
            {
              view: "accordion",
              rows: [
                {
                  header: "What is this app for?",
                  body: {
                    template:
                      "This app helps you manage your tasks efficiently and stay organized.",
                    autoheight: true,
                    css: "webix_shadow_medium",
                  },
                },
                {
                  header: "How do I reset my password?",
                  body: {
                    template:
                      "To reset your password, click on 'Forgot Password' in the login screen and follow the instructions.",
                    autoheight: true,
                    css: "webix_shadow_medium",
                  },
                },
                {
                  header: "How do I contact support?",
                  body: {
                    template:
                      "You can reach our support team through the contact section or by sending an email to support@example.com.",
                    autoheight: true,
                    css: "webix_shadow_medium",
                  },
                },
                {
                  header: "Is my data safe?",
                  body: {
                    template:
                      "Yes, we ensure all your data is encrypted and secure with industry-standard security practices.",
                    autoheight: true,
                    css: "webix_shadow_medium",
                  },
                },
              ],
            },
          ],
        },
      ],
    };
  }
}
