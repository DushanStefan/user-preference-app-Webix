// ui.test.js
import { JetApp } from "webix-jet";
import SecuritySettingsView from "./uiTest";

describe("SecuritySettingsView", () => {
  let app;

  beforeEach(async () => {
    document.body.innerHTML = '<div id="app"></div>';

    app = new JetApp({
      id: "testApp",
      start: "/start",
      views: {
        start: SecuritySettingsView,
      },
    });

    await app.render("app");
  });

  afterEach(() => {
    if (app) app.destructor();
  });

  test("should render cancel button and trigger click event", () => {
    const button = document.querySelector(".webix_secondary");
    expect(button).not.toBeNull();
    button.click();

    setTimeout(() => {
      const message = document.querySelector(".webix_message_area");
      expect(message.textContent).toContain(
        "Security settings changes cancelled"
      );
    }, 500);
  });

  test("should toggle password visibility", () => {
    const button = document.querySelector("#password_toggle");
    expect(button).not.toBeNull();

    button.click();

    setTimeout(() => {
      const field = document.querySelector("#password_field");
      expect(field.getAttribute("type")).toBe("text");
    }, 500);
  });

  test("should show confirmation for personal data request", () => {
    const button = document.querySelector(
      "button[value='Request Personal Data']"
    );
    expect(button).not.toBeNull();

    button.click();

    setTimeout(() => {
      const confirmBox = document.querySelector(".webix_confirm");
      expect(confirmBox).not.toBeNull();
    }, 500);
  });

  test("should show confirmation for account deletion", () => {
    const button = document.querySelector(
      "button[value='Request Account Deletion']"
    );
    expect(button).not.toBeNull();

    button.click();

    setTimeout(() => {
      const confirmBox = document.querySelector(".webix_confirm");
      expect(confirmBox).not.toBeNull();
    }, 500);
  });
});
