import { JetView, plugins } from "webix-jet";
import { Navbar } from "C:/Users/ferna/Desktop/user-preference-app-Webix/sources/assets/toolbar.js";

export default class TopView extends JetView {
  config() {
    var menu_data = [
      { id: "account", value: "Account Settings", icon: "wxi-user" },
      {
        id: "notification",
        value: "Notification Settings",
        icon: "mdi mdi-bell",
      },
      { id: "theme", value: "Theme Settings", icon: "mdi mdi-brush" },
      { id: "privacy", value: "Privacy Settings", icon: "mdi mdi-lock" },
    ];

    var toolbar = {
      view: "toolbar",
      padding: 3,
      elements: [
        {
          view: "icon",
          icon: "mdi mdi-menu",
          click: function () {
            $$("$sidebar1").toggle();
          },
        },
        { view: "label", label: "Settings" },
        {},
      ],
    };

    var sidebar = {
      view: "sidebar",
      id: "$sidebar1",
      data: menu_data,

      on: {
        onItemMouseIn: function (id) {
          // Event to show message on hover
          webix.message("Hovered: " + this.getItem(id).value);
        },
        onAfterSelect: function (id) {
          webix.message("Selected: " + this.getItem(id).value);
        },
      },
      width: 250, // Default width for the sidebar
      resizable: true, // Make the sidebar resizable
    };

    var ui = {
      type: "clean",
      rows: [
        toolbar,
        {
          cols: [
            {
              rows: [sidebar],
            },
            {
              type: "wide",
              paddingY: 10,
              paddingX: 5,
              rows: [{ $subview: true }],
            },
          ],
        },
      ],
    };

    return {
      rows: [Navbar, ui],
    };
  }

  init() {
    this.use(plugins.Menu, "$sidebar1");

    // Handle screen resize for responsive behavior
    webix.event(window, "resize", () => this.adjustSidebar());

    // Initial adjustment
    this.adjustSidebar();
  }

  adjustSidebar() {
    const sidebar = $$("$sidebar1");
    const windowWidth = window.innerWidth;

    // If screen width is less than 768px, hide sidebar by default
    if (windowWidth < 768) {
      sidebar.hide();
    } else {
      sidebar.show();
    }
  }
}

// // views/top.js (Webix Jet View)
// import { Navbar } from "../assets/toolbar.js";
// // import { Navbar } from "toolbar.js";
// import { HomePage } from "./home.js";
// import { LoginPage } from "./login.js";
// import { SignupPage } from "./sign.js";
// import TopView from "./settings.js";
// import { ForgotPasswordPage } from "./forgotpass.js";
// import { OtpVerificationPage } from "./otp.js";
// import { JetView } from "webix-jet";

// export default class TopView extends JetView {
//   constructor(app, config) {
//     super(app, config);
//     this.isDarkMode = false;
//   }

//   config() {
//     return {
//       rows: [
//         Navbar,
//         {
//           view: "scrollview",
//           body: {
//             view: "multiview",
//             id: "mainView",
//             cells: [
//               { id: "home", ...HomePage },
//               { id: "login", ...LoginPage },
//               { id: "signup", ...SignupPage },
//               { id: "settings", ...SettingsPage },
//               { id: "forgotpassword", ...ForgotPasswordPage },
//               { id: "otpverification", ...OtpVerificationPage },
//             ],
//           },
//         },
//       ],
//     };
//   }

//   // Override the init method for additional logic
//   init() {
//     // Function to handle navigation
//     window.showView = (viewId) => {
//       this.getRoot().queryView({ view: "multiview" }).setValue(viewId);
//     };

//     // Set default view
//     window.showView("home");

//     // Theme toggle
//     window.toggleTheme = (isDark) => {
//       const darkTheme = document.querySelector('link[href*="dark.css"]');
//       if (isDark) {
//         darkTheme.removeAttribute("disabled");
//         webix.skin.set("dark");
//         document.body.classList.add("dark-mode");
//       } else {
//         darkTheme.setAttribute("disabled", "true");
//         webix.skin.set("material");
//         document.body.classList.remove("dark-mode");
//       }
//       this.isDarkMode = isDark;
//     };

//     // Keyboard Navigation
//     webix.event(document, "keydown", (e) => {
//       const multiview = this.getRoot().queryView({ view: "multiview" });
//       const views = multiview.getChildViews();
//       let currentIndex = views.findIndex(
//         (view) => view.config.id === multiview.getValue()
//       );

//       let isLogin = JSON.parse(localStorage.getItem("loggedUser")) || false;

//       if (e.ctrlKey && e.key === "ArrowRight") {
//         // Move to next view
//         let nextIndex = (currentIndex + 1) % views.length;
//         multiview.setValue(views[nextIndex].config.id);
//         e.preventDefault();
//       } else if (e.ctrlKey && e.key === "ArrowLeft") {
//         // Move to previous view
//         let prevIndex = (currentIndex - 1 + views.length) % views.length;
//         multiview.setValue(views[prevIndex].config.id);
//       } else if (e.key === "Enter") {
//         // Reload current view (or trigger an action)
//         multiview.setValue(views[currentIndex].config.id);
//       } else if (e.altKey && e.key === "h") {
//         showView("home");
//       } else if (e.altKey && e.key === "l") {
//         showView("login");
//       } else if (e.altKey && e.key === "s") {
//         showView("signup");
//       }

//       if (e.altKey && e.key === "t") {
//         toggleTheme(!this.isDarkMode);
//       }
//     });
//   }
// }
