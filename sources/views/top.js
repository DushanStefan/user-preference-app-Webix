// import { JetView, plugins } from "webix-jet";

// export default class TopView extends JetView {
//   config() {
//     const { _, getLang, setLang } = this.app.getService("locale");
//     var locales = {
//       view: "toolbar",
//       cols: [
//         { view: "button", value: _("hello"), width: 200 },
//         {},
//         {
//           view: "segmented",
//           options: ["en", "de"],
//           value: getLang(),
//           width: 200,
//           on: {
//             onChange: (value) => setLang(value),
//           },
//         },
//       ],
//     };

//     var header = {
//       type: "header",
//       template: this.app.config.name,
//       css: "webix_header app_header",
//     };

//     var menu = {
//       view: "menu",
//       id: "top:menu",
//       css: "app_menu",
//       width: 180,
//       layout: "y",
//       select: true,
//       template: "<span class='webix_icon #icon#'></span> #value# ",
//       data: [
//         {
//           value: "Account Settings",
//           id: "account",
//           icon: "wxi-user",
//         },
//         {
//           value: "Notification Settings",
//           id: "notification",
//           icon: "wxi-bell",
//         },
//         {
//           value: "Theme Settings",
//           id: "theme",
//           icon: "wxi-brush",
//         },
//         {
//           value: "Privacy Settings",
//           id: "privacy",
//           icon: "wxi-lock",
//         },
//       ],
//     };

//     var ui = {
//       type: "clean",
//       paddingX: 5,
//       css: "app_layout",
//       cols: [
//         {
//           paddingX: 5,
//           paddingY: 10,
//           rows: [{ css: "webix_shadow_medium", rows: [header, menu] }],
//         },
//         { type: "wide", paddingY: 10, paddingX: 5, rows: [{ $subview: true }] },
//       ],
//     };

//     return {
//       rows: [locales, ui],
//     };
//   }
//   init() {
//     this.use(plugins.Menu, "top:menu");
//   }
// }
//----------------------------------------

import { JetView, plugins } from "webix-jet";

export default class TopView extends JetView {
  config() {
    // Responsive toolbar
    const locales = {
      view: "toolbar",
      responsive: true,
      cols: [
        {
          view: "button",
          value: "Settings",
          width: 100,
          responsive: true,
          css: "webix_primary",
        },
        { width: 10 },
        {
          view: "segmented",
          options: ["en", "de"],
          value: this.app.getService("locale").getLang(),
          width: 120,
          responsive: true,
          on: {
            onChange: (value) => this.app.getService("locale").setLang(value),
          },
        },
      ],
    };

    // Responsive header
    const header = {
      type: "header",
      template: this.app.config.name,
      css: "webix_header app_header",
    };

    // Responsive menu
    const menu = {
      view: "menu",
      id: "top:menu",
      css: "app_menu",
      layout: "y",
      select: true,
      responsive: true,
      template: "<span class='webix_icon #icon#'></span> #value#",
      data: [
        { value: "Account Settings", id: "account", icon: "wxi-user" },
        {
          value: "Notification Settings",
          id: "notification",
          icon: "wxi-bell",
        },
        { value: "Theme Settings", id: "theme", icon: "wxi-brush" },
        { value: "Privacy Settings", id: "privacy", icon: "wxi-lock" },
      ],
    };

    // Responsive layout
    const ui = {
      type: "clean",
      responsive: true,
      rows: [
        locales,
        {
          cols: [
            {
              width: 250,
              minWidth: 200,
              maxWidth: 350,
              rows: [header, menu],
            },
            {
              view: "resizer",
            },
            {
              view: "scrollview",
              body: { $subview: true },
              responsive: true,
            },
          ],
        },
      ],
    };

    return ui;
  }

  init() {
    // Use menu plugin
    this.use(plugins.Menu, "top:menu");

    // Add responsive behavior
    webix.ui.dataLayout = {
      $init: function (config) {
        webix.extend(config, {
          responsive: true,
        });
      },
    };

    // Adjust layout on window resize
    webix.event(window, "resize", () => {
      this.adjustLayout();
    });
  }

  adjustLayout() {
    const width = document.documentElement.clientWidth;

    // Mobile view
    if (width < 600) {
      this.mobileView();
    }
    // Tablet view
    else if (width < 1024) {
      this.tabletView();
    }
    // Desktop view
    else {
      this.desktopView();
    }
  }

  mobileView() {
    // Collapse menu, full-width subview
    const menu = $$("top:menu");
    if (menu) menu.hide();

    // Adjust layout for mobile
    webix.ui({
      rows: [
        {
          view: "toolbar",
          elements: [
            {
              view: "icon",
              icon: "wxi-menu",
              click: () => $$("top:menu").toggle(),
            },
          ],
        },
        { $subview: true, width: "auto" },
      ],
    });
  }

  tabletView() {
    // Partial menu, adaptable layout
    const menu = $$("top:menu");
    if (menu) menu.show();

    webix.ui({
      cols: [
        {
          width: 180,
          rows: [{ view: "menu", data: menu.config.data }],
        },
        { $subview: true },
      ],
    });
  }

  desktopView() {
    // Full menu, standard layout
    const menu = $$("top:menu");
    if (menu) menu.show();

    webix.ui({
      cols: [
        {
          width: 250,
          rows: [{ view: "menu", data: menu.config.data }],
        },
        { $subview: true },
      ],
    });
  }
}
