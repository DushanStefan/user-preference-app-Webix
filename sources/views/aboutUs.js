import { JetView } from "webix-jet";
import { Navbar } from "../assets/toolbar";

export default class AboutUs extends JetView {
  config() {
    const isLogin = JSON.parse(localStorage.getItem("loggedUser")) === true;

    return {
      rows: [
        Navbar,
        {
          type: "space",
          rows: [
            {
              template: `
                <div style="padding: 20px;">
                  <h2 style="color: #4A90E2;">About Us</h2>
                  <p style="font-size: 18px; color: #333;">We provide a user-friendly experience that allows you to easily customize your settings and navigate seamlessly through the app.</p>
                </div>
              `,
              autoheight: true,
              css: "webix_shadow_medium",
            },
            {
              template: `
                <div style="padding: 20px;">
                  <h2 style="color: #4A90E2;">Contact Us</h2>
                  <p style="font-size: 16px; color: #333;">If you have any questions, feel free to reach out to us!</p>
                  <ul style="list-style: none; padding: 0; font-size: 16px;">
                    <li style="margin-bottom: 15px; display: flex; align-items: center;">
                      <i class="webix_icon wxi-user" style="color: #4A90E2; margin-right: 10px;"></i>
                      <span>John Doe - Support</span>
                    </li>
                    <li style="margin-bottom: 15px; display: flex; align-items: center;">
                      <i class="webix_icon wxi-envelope" style="color: #4A90E2; margin-right: 10px;"></i>
                      <a href="mailto:support@example.com" style="color: #4A90E2; text-decoration: none;">support@example.com</a>
                    </li>
                    <li style="margin-bottom: 15px; display: flex; align-items: center;">
                      <i class="webix_icon wxi-phone" style="color: #4A90E2; margin-right: 10px;"></i>
                      <a href="tel:+1234567890" style="color: #4A90E2; text-decoration: none;">+1 234 567 890</a>
                    </li>
                  </ul>
                </div>
              `,
              autoheight: true,
              css: "webix_shadow_medium",
            },
          ],
        },
      ],
    };
  }
}
