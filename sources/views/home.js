let isLogin = true;
// import { JetView } from "webix-jet";

export const HomePage = {
  id: "home",
  view: "layout",
  css: "home-container",
  rows: [
    // Hero Section with a more prominent message
    {
      view: "template",
      height: 300,
      css: "image-container",
      template: `
                <div class="image-container">
                    <h2 class="h2tag">Welcome to <span class="app-name">Demo App</span></h2>
                    <p class="subheading">A personalized experience tailored for you</p>
                </div>
            `,
    },

    // Main Content Section (two-column layout)
    {
      cols: [
        // Left Column: Info Section with About Us and Contact Us
        {
          view: "layout",
          gravity: 2,
          rows: [
            {
              view: "template",
              height: 180,
              css: "info-section",
              template: `
                    <div class="info-card">
                        <h2 class="about-text">About Us</h2>
                        <p>We provide a user-friendly experience that allows you to easily customize your settings and navigate seamlessly through the app.</p>
                    </div>
                  `,
            },
            {
              view: "template",
              height: 180,
              css: "info-section",
              template: `
                    <div class="contact-card">
                        <h2>Contact Us</h2>
                        <p>If you have any questions, feel free to reach out to us!</p>
                    </div>
                  `,
            },
          ],
        },

        // Right Column: Login Section
        {
          view: "layout",
          gravity: 1,
          rows: [
            {
              view: "template",
              height: 350,
              css: "login-container",
              template: `
                    <div class="login-container">
                        <p class="description">Customize your experience with personalized settings for notifications, themes, and more.</p>
                        <button class="login-button" onclick="showView('login')" ${
                          isLogin ? 'style="display:none;"' : ""
                        }>
                          <span class="login-icon">🔑</span> Log In
                        </button>
                    </div>
                  `,
            },
          ],
        },
      ],
    },
  ],
};
