import { JetView, plugins } from "webix-jet";
import { Navbar } from "../assets/toolbar";

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
      // css: "light-blue-sidebar",

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
      // resizable: true, // Make the sidebar resizable
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

  // adjustSidebar() {
  //   // const sidebar = $$("$sidebar1");
  //   const sidebar = this.getRoot().queryView({ id: "$sidebar1" });
  //   const windowWidth = window.innerWidth;

  //   // If screen width is less than 768px, hide sidebar by default
  //   if (windowWidth < 768) {
  //     sidebar.hide();
  //   } else {
  //     sidebar.show();
  //   }
  // }

  adjustSidebar() {
    const sidebar = this.getRoot().queryView({ id: "$sidebar1" });
    if (!sidebar) return;

    const windowWidth = window.innerWidth;
    // console.log(window.innerWidth);
    windowWidth < 750 ? sidebar.collapse() : sidebar.expand();
  }
}

//-------------------------
// import { JetView, plugins } from "webix-jet";
// import { Navbar } from "../assets/toolbar";

// export default class TopView extends JetView {
//   config() {
//     const self = this;

//     var menu_data = [
//       { id: "account", value: "Account Settings", icon: "wxi-user" },
//       {
//         id: "notification",
//         value: "Notification Settings",
//         icon: "mdi mdi-bell",
//       },
//       { id: "theme", value: "Theme Settings", icon: "mdi mdi-brush" },
//       { id: "privacy", value: "Privacy Settings", icon: "mdi mdi-lock" },
//     ];

//     var toolbar = {
//       view: "toolbar",
//       padding: 3,
//       elements: [
//         {
//           view: "icon",
//           icon: "mdi mdi-menu",
//           click: function () {
//             $$("$sidebar1").toggle();
//           },
//         },
//         { view: "label", label: "Settings" },
//         {},
//       ],
//     };

//     var sidebar = {
//       view: "sidebar",
//       id: "$sidebar1",
//       data: menu_data,
//       on: {
//         onItemMouseIn: function (id) {
//           webix.message("Hovered: " + this.getItem(id).value);
//         },
//         onAfterSelect: function (id) {
//           webix.message("Selected: " + this.getItem(id).value);
//         },
//         onViewShow: function () {
//           // This ensures sidebar is properly initialized
//           self._initSidebarResponsive();
//         },
//       },
//       width: 250,
//     };

//     var ui = {
//       type: "clean",
//       rows: [
//         toolbar,
//         {
//           cols: [
//             {
//               rows: [sidebar],
//             },
//             {
//               type: "wide",
//               paddingY: 10,
//               paddingX: 5,
//               rows: [{ $subview: true }],
//             },
//           ],
//         },
//       ],
//     };

//     return {
//       rows: [Navbar, ui],
//     };
//   }

//   init() {
//     this.use(plugins.Menu, "$sidebar1");
//     this._initSidebarResponsive();
//   }

//   _initSidebarResponsive() {
//     // Remove previous handler if it exists
//     if (this._resizeEvent) {
//       webix.eventRemove(this._resizeEvent);
//     }

//     // Create new handler
//     this._resizeEvent = webix.event(window, "resize", function () {
//       const sidebar = $$("$sidebar1");
//       if (sidebar) {
//         if (window.innerWidth < 768) {
//           sidebar.hide();
//         } else {
//           sidebar.show();
//         }
//       }
//     });

//     // Initial adjustment
//     const sidebar = $$("$sidebar1");
//     if (sidebar) {
//       if (window.innerWidth < 768) {
//         sidebar.hide();
//         console.log(67);
//       } else {
//         // sidebar.show();
//         sidebar.hide();
//         console.log(6734);
//       }
//     }
//   }

//   destroy() {
//     if (this._resizeEvent) {
//       webix.eventRemove(this._resizeEvent);
//     }
//   }
// }
