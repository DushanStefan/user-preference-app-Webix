import { JetView } from "webix-jet";

export default class ThemeSettingsView extends JetView {
  config() {
    return {
      view: "form",
      id: "themeSettingsForm",
      elemHeight: 600,
      elements: [
        {
          view: "template",
          template: "Theme Customization",
          type: "section",
        },
        {
          rows: [
            // Theme Selection
            {
              view: "dataview",
              id: "themeSelector",
              width: 400,
              height: 150,
              xCount: 3,
              template: "#name#",
              data: [
                {
                  id: "default",
                  name: "Default",
                  primaryColor: "#3498db",
                  backgroundColor: "#ffffff",
                  textColor: "#2c3e50",
                },
                {
                  id: "dark",
                  name: "Dark",
                  primaryColor: "#2980b9",
                  backgroundColor: "#2c3e50",
                  textColor: "#ecf0f1",
                },
                {
                  id: "light",
                  name: "Light",
                  primaryColor: "#2ecc71",
                  backgroundColor: "#f1f2f6",
                  textColor: "#2f3542",
                },
                {
                  id: "ocean",
                  name: "Ocean",
                  primaryColor: "#34495e",
                  backgroundColor: "#2c3e50",
                  textColor: "#bdc3c7",
                },
                {
                  id: "sunset",
                  name: "Sunset",
                  primaryColor: "#e74c3c",
                  backgroundColor: "#f39c12",
                  textColor: "#ffffff",
                },
              ],
              type: {
                template: (obj) => `
                                    <div style='
                                        background-color:${obj.backgroundColor};
                                        color:${obj.textColor};
                                        border:3px solid ${obj.primaryColor};
                                        height:100px;
                                        display:flex;
                                        align-items:center;
                                        justify-content:center;
                                        margin:5px;
                                    '>
                                        ${obj.name} Theme
                                    </div>
                                `,
                width: 120,
                height: 120,
              },
              select: true,
              on: {
                onItemClick: (id) => this.selectTheme(id),
              },
            },

            // Font Settings
            {
              view: "select",
              label: "Font Family",
              id: "fontSelector",
              options: [
                { id: "system", value: "System Default" },
                { id: "roboto", value: "Roboto" },
                { id: "opensans", value: "Open Sans" },
                { id: "lato", value: "Lato" },
              ],
              value: "system",
            },

            // Action Buttons
            {
              margin: 10,
              cols: [
                {
                  view: "button",
                  value: "Apply Theme",
                  css: "webix_primary",
                  click: () => this.applyTheme(),
                },
                {
                  view: "button",
                  value: "Reset",
                  css: "webix_secondary",
                  click: () => this.resetTheme(),
                },
              ],
            },
          ],
        },
      ],
    };
  }

  init() {
    // Set default theme
    this.currentTheme = "default";
  }

  selectTheme(themeId) {
    this.currentTheme = themeId;
  }

  applyTheme() {
    // Get selected theme data
    const themeData = this.$$("themeSelector").getItem(this.currentTheme);
    const fontFamily = this.$$("fontSelector").getValue();

    // Apply global styles
    document.documentElement.style.setProperty(
      "--primary-color",
      themeData.primaryColor
    );
    document.documentElement.style.setProperty(
      "--background-color",
      themeData.backgroundColor
    );
    document.documentElement.style.setProperty(
      "--text-color",
      themeData.textColor
    );

    // Apply font
    const fontMap = {
      system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI"',
      roboto: '"Roboto", sans-serif',
      opensans: '"Open Sans", sans-serif',
      lato: '"Lato", sans-serif',
    };
    document.documentElement.style.setProperty(
      "--font-family",
      fontMap[fontFamily]
    );

    // Modify Webix global theme
    webix.css.addRule(`
            .webix_view, body {
                background-color: var(--background-color) !important;
                color: var(--text-color) !important;
                font-family: var(--font-family) !important;
            }
            .webix_button, .webix_el_button {
                background-color: var(--primary-color) !important;
                color: white !important;
            }
        `);

    // Optional: Dynamically reload Webix CSS
    webix.html.removeCSS();

    webix.message({
      type: "success",
      text: "Theme applied successfully!",
    });
  }

  resetTheme() {
    // Reset to default theme
    this.$$("themeSelector").select("default");
    this.$$("fontSelector").setValue("system");
    this.applyTheme();

    webix.message({
      type: "info",
      text: "Theme reset to default!",
    });
  }
}
