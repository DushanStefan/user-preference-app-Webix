import { JetView } from "webix-jet";

export default class ThemeSettingsView extends JetView {
  config() {
    return {
      view: "form",
      id: "theme_settings",
      elements: [
        // Color Theme Section
        {
          view: "fieldset",
          label: "Color Theme",
          css: "section_header",
          body: {
            rows: [
              {
                view: "radio",
                id: "color_theme",
                name: "color_theme",
                label: "Select Theme",
                value: "light",
                options: [
                  { id: "light", value: "Light Mode" },
                  { id: "dark", value: "Dark Mode" },
                ],
                on: {
                  onChange: (newValue) => this.applyColorTheme(newValue),
                },
                bottomPadding: 20,
                labelWidth: 150,
              },
            ],
          },
        },

        // Font & Typography Section
        {
          view: "fieldset",
          label: "Font & Typography",
          css: "section_header",
          body: {
            rows: [
              {
                view: "select",
                id: "font_family",
                name: "font_family",
                label: "Font Family",
                value: "default",
                options: [
                  { id: "default", value: "Default System Font" },
                  { id: "sporty", value: "Sporty" },
                  { id: "formal", value: "Formal" },
                  { id: "dyslexic", value: "Dyslexia Friendly" },
                ],
                on: {
                  onChange: (newValue) => this.validateAndApplyFont(newValue),
                },
                bottomPadding: 20,
                labelWidth: 150,
              },
              {
                view: "slider",
                id: "font_size",
                name: "font_size",
                label: "Font Size",
                value: 16,
                min: 12,
                max: 24,
                step: 2,
                title: webix.template("#value#px"),
                on: {
                  onChange: (newValue) => this.adjustFontSize(newValue),
                },
                bottomPadding: 20,
                labelWidth: 150,
              },
            ],
          },
        },

        // Accessibility Features Section
        {
          view: "fieldset",
          label: "Accessibility Features",
          css: "section_header",
          bottomPadding: 20,
          labelWidth: 150,
          body: {
            rows: [
              {
                view: "switch",
                id: "high_contrast",
                name: "high_contrast",
                label: "High Contrast Mode",
                value: 0,
                on: {
                  onChange: (newValue) => this.toggleHighContrast(newValue),
                },
                bottomPadding: 20,
                labelWidth: 150,
              },
              {
                view: "switch",
                id: "dyslexia_font",
                name: "dyslexia_font",
                label: "Dyslexia Friendly Font",
                value: 0,
                on: {
                  onChange: (newValue) => this.toggleDyslexiaFont(newValue),
                },
                bottomPadding: 20,
                labelWidth: 150,
              },
            ],
          },
        },

        // Save Button

        {
          margin: 10,
          cols: [
            { width: 150 }, // Spacer
            {
              view: "button",
              value: "Save Theme Preferences",
              css: "webix_primary",
              click: () => this.saveThemeSettings(),
            },
            {
              view: "button",
              value: "Reset to Defaults",
              css: "webix_secondary",
              click: () => this.saveThemeSettings(),
            },
          ],
        },
        // {
        //   view: "button",
        //   value: "Save Theme Preferences",
        //   click: () => this.saveThemeSettings(),
        // },
      ],
    };
  }

  // init() {
  //   // Initial theme application
  //   this.applyColorTheme($$("color_theme").getValue());
  // }

  init() {
    // Load saved font size from localStorage if available
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      this.adjustFontSize(savedFontSize); // Apply saved font size
      $$("font_size").setValue(savedFontSize); // Set the value of the slider
    }

    // Initial theme application
    this.applyColorTheme($$("color_theme").getValue());
  }

  validateAndApplyFont(fontValue) {
    // Limit custom fonts to prevent performance issues
    const performanceThreshold = 3; // Max number of custom fonts
    const customFonts = ["sporty", "formal", "dyslexic"];

    // Check if selected font is a custom font
    if (customFonts.includes(fontValue)) {
      // Simulate a check for existing custom fonts in use
      webix.message({
        type: "warning",
        text: `Applying ${fontValue} font. Be mindful of performance.`,
      });
    }

    // Apply font logic would go here
    // document.body.style.fontFamily = this.getFontFamily(fontValue);
    document.documentElement.style.setProperty(
      "--font-family",
      this.getFontFamily(fontValue)
    );
  }

  getFontFamily(fontValue) {
    const fontMap = {
      default: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      sporty: '"Arial", sans-serif',
      formal: '"Times New Roman", serif',
      dyslexic: '"OpenDyslexic", Arial, sans-serif',
    };
    return fontMap[fontValue] || fontMap["default"];
  }

  applyColorTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      this.webix.skin.set("dark");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      this.webix.skin.set("material");
    }
    // webix.ui({
    //   theme: theme === "dark" ? "dark" : "light", // Dynamically switch Webix's internal theme
    // });
  }

  // adjustFontSize(size) {
  //   document.body.style.fontSize = `${size}px`;
  // }

  toggleHighContrast(isEnabled) {
    if (isEnabled) {
      document.body.classList.add("high-contrast");
    } else {
      document.body.classList.remove("high-contrast");
    }
  }

  toggleDyslexiaFont(isEnabled) {
    if (isEnabled) {
      // Automatically select dyslexia-friendly font
      $$("font_family").setValue("dyslexic");
    } else {
      // Reset to default font
      $$("font_family").setValue("default");
    }
  }

  saveThemeSettings() {
    const settings = {
      colorTheme: $$("color_theme").getValue(),
      fontFamily: $$("font_family").getValue(),
      fontSize: $$("font_size").getValue(),
      highContrast: $$("high_contrast").getValue(),
      dyslexiaFont: $$("dyslexia_font").getValue(),
    };
    // Save to localStorage
    localStorage.setItem("themeSettings", JSON.stringify(settings));
    // Simulate saving settings
    localStorage.setItem("fontSize", settings.fontSize);
    webix.message({
      type: "success",
      text: "Theme preferences saved successfully!",
    });

    // In a real application, you'd send these settings to a backend
    console.log("Theme Settings:", settings);
  }

  adjustFontSize(size) {
    document.documentElement.style.setProperty("--font-size", `${size}px`);
    localStorage.setItem("fontSize", size); // Save for future sessions
  }
}
