import { JetView } from "webix-jet";
import { Navbar } from "../assets/toolbar";

export default class HomePage extends JetView {
  config() {
    //  const isLogin = JSON.parse(localStorage.getItem("loggedUser")) === true;
    const isLogin = false;

    return {
      rows: [
        // Hero Section
        Navbar,
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

        {
          view: "layout",

          rows: [
            {
              view: "template",
              localId: "loginBlock",
              height: 350,
              css: "login-container",
              template: `
                    <div class="login-container">
                      <p class="description">
                        Customize your experience with personalized settings for notifications, themes, and more.
                      </p>
                      <div id="loginBtnWrapper"></div>
                    </div>
                  `,
              hidden: isLogin,
            },
          ],
        },
      ],
    };
  }

  ready() {
    const isLogin = JSON.parse(localStorage.getItem("loggedUser")) === true;
    if (!isLogin) {
      const container =
        this.$$("loginBlock").$view.querySelector("#loginBtnWrapper");
      webix.ui(
        {
          view: "button",
          label: "🔑 Log In",
          width: 120,
          css: "webix_primary login-button",
          click: () => {
            this.app.show("/login");
          },
        },
        container
      );
    }
  }
}
