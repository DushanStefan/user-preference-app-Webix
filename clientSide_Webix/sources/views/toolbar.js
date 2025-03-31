// let isLogin = true;

let isLogin = JSON.parse(localStorage.getItem("loggedUser")) || false;
// let isLogin = JSON.parse(localStorage.getItem("loggedUser")) === true;
console.log(JSON.parse(localStorage.getItem("loggedUser")), "tool");
// console.log(isLogin);
function showView(view) {
  if (window.app) {
    window.app.show(`/${view}`);
  } else {
    console.error("App is not initialized yet.");
  }
}

// function updateNavbar() {
//   isLogin = JSON.parse(localStorage.getItem("loggedUser")) || false;
//   webix.ui(Navbar, $$("navbar").getParentView()); // Reinitialize navbar
// }

const moreOptionsMenu = {
  view: "contextmenu",
  id: "more_options_menu",
  width: 150,
  data: [
    { id: "home", value: "Home" },
    { id: "profile settings", value: "Profile Setting" },
    { id: "help", value: "Help" },
    { id: "aboutUs", value: "About Us" },
    { id: "logOut", value: "LogOut" },

    // Add more menu items as needed
  ],
  on: {
    onItemClick: function (id) {
      switch (id) {
        case "home":
          showView("home");
          break;
        case "profile settings":
          showView("top/account");
          break;

        case "help":
          showView("help");
          break;
        case "aboutUs":
          showView("aboutUs");
          break;

        case "logOut":
          localStorage.removeItem("loggedUser");
          if (window.updateNavbar) {
            window.updateNavbar(); // Ensure navbar updates
          }
          showView("home");
          break;
        // Handle other menu items
      }
    },
  },
};

const moreOptionsMenuO = {
  view: "contextmenu",
  id: "more_options_menuO",
  width: 150,
  data: [
    { id: "home", value: "Home" },

    { id: "help", value: "Help" },
    { id: "aboutUs", value: "About Us" },

    // Add more menu items as needed
  ],
  on: {
    onItemClick: function (id) {
      switch (id) {
        case "home":
          showView("home");
          break;

        case "help":
          showView("help");
          break;
        case "aboutUs":
          showView("aboutUs");
          break;
        // Handle other menu items
      }
    },
  },
};

export const Navbar = {
  id: "navbar",
  view: "toolbar",
  height: 60,
  css: "navContainer",
  responsive: true,
  cols: [
    // Home Icon
    // {
    //   view: "icon",
    //   icon: "mdi mdi-home",
    //   click: () => showView("home"),
    //   width: 40,
    // },
    {
      view: "spacer",
      fillspace: true,
    },

    // Right-aligned items (Settings, Theme Switch, Logout, Profile)
    {
      cols: [
        {
          view: "icon",
          icon: "wxi-user",
          height: 32, // Set the container height
          width: 32,

          // click: () => {
          //   localStorage.setItem("loggedUser", "false");
          //   console.log("LOG OUT!");
          //   updateNavbar();
          //   showView("home");
          // },
          hidden: !isLogin,
          css: "rightAlign",
          responsive: {
            "screen-xxs": { width: 80, height: 32 }, // Smaller size for very small screens
            "screen-s": { width: 100, height: 40 }, // Slightly larger on small screens
            "screen-m": { width: 150, height: 56 }, // Default size for larger screens
          },
        },
        // {
        //   view: "icon",
        //   icon: "mdi mdi-dots-vertical",
        //   click: () => showView("top"),
        //   hidden: !isLogin,
        //   width: 40,
        //   css: "rightAlign",
        //   hidden: !isLogin,
        // },
        {
          view: "icon",
          id: "more_options_button",
          icon: "mdi mdi-dots-vertical",
          width: 40,
          css: "rightAlign",
          hidden: !isLogin,
          click: function () {
            // Show the context menu near this button
            $$("more_options_menu").show(this.$view);
          },
        },
      ],
    },

    // When not logged in
    {
      cols: [
        {
          view: "button",
          label: "LogIn",
          width: 100,
          click: () => showView("login"),
          hidden: isLogin,
          css: "reduceSpacing",
        },
        {
          view: "button",
          label: "SignUp",
          width: 100,
          click: () => showView("signUp"),
          hidden: isLogin,
          css: "reduceSpacing",
        },
        // {
        //   view: "switch",
        //   id: "themeSwitchPublic",
        //   width: 100,
        //   value: 0,
        //   onLabel: "<span class='webix_icon fas fa-sun'></span>",
        //   offLabel: "<span class='webix_icon fas fa-moon'></span>",
        //   on: {
        //     onChange: function (value) {
        //       toggleTheme(value);
        //     },
        //   },
        //   hidden: isLogin,
        //   css: "reduceSpacing",
        // },
        {
          view: "icon",
          id: "more_options_buttonO",
          icon: "mdi mdi-dots-vertical",
          width: 40,
          css: "rightAlign",
          hidden: isLogin,
          click: function () {
            // Show the context menu near this button
            $$("more_options_menuO").show(this.$view);
          },
        },
      ],
      responsive: "hide",
    },
  ],
};

window.updateNavbar = function () {
  isLogin = JSON.parse(localStorage.getItem("loggedUser")) || false;
  console.log(isLogin);

  // Update UI elements dynamically
  // $$("navbar").reconstruct();
  const navbar = $$("navbar");
  if (navbar) {
    navbar.define("cols", Navbar.cols); // Redefine columns
    navbar.refresh(); // Refresh to apply changes
  }
};
// Initialize the context menu
webix.ready(function () {
  webix.ui(moreOptionsMenu);
  webix.ui(moreOptionsMenuO);
});
