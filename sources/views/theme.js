import { JetView } from "webix-jet";

export default class ThemeSettingsView extends JetView {
  config() {
    return {
      view: "form",
      id: "theme_settings",
      elements: [
        // Color Theme Section
        {
          view: "label",
          label: "Color Theme",
          css: "section_header",
        },
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
        },

        // Font & Typography Section
        {
          view: "label",
          label: "Font & Typography",
          css: "section_header",
        },
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
        },

        // Accessibility Features Section
        {
          view: "label",
          label: "Accessibility Features",
          css: "section_header",
        },
        {
          view: "switch",
          id: "high_contrast",
          name: "high_contrast",
          label: "High Contrast Mode",
          value: 0,
          on: {
            onChange: (newValue) => this.toggleHighContrast(newValue),
          },
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
        },

        // Save Button
        {
          view: "button",
          value: "Save Theme Preferences",
          click: () => this.saveThemeSettings(),
        },
      ],
    };
  }

  init() {
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
    document.body.style.fontFamily = this.getFontFamily(fontValue);
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
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }

  adjustFontSize(size) {
    document.body.style.fontSize = `${size}px`;
  }

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

    // Simulate saving settings
    webix.message({
      type: "success",
      text: "Theme preferences saved successfully!",
    });

    // In a real application, you'd send these settings to a backend
    console.log("Theme Settings:", settings);
  }
}
