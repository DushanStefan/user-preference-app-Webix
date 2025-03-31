import { JetView, plugins } from "webix-jet";
import { Navbar } from "./toolbar";

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
        // onAfterSelect: function (id) {
        //   webix.message("Selected: " + this.getItem(id).value);
        // },
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

  adjustSidebar() {
    const sidebar = this.getRoot().queryView({ id: "$sidebar1" });
    if (!sidebar) return;

    const windowWidth = window.innerWidth;
    // console.log(window.innerWidth);
    windowWidth < 750 ? sidebar.collapse() : sidebar.expand();
  }
}
