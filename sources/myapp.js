import "./styles/app.css";
import { JetApp, EmptyRouter, HashRouter, plugins } from "webix-jet";

import { AuthModel } from "./views/auth";

// dynamic import of views
const modules = import.meta.glob("./views/**/*.js");
const views = (name) => modules[`./views/${name}.js`]().then((x) => x.default);

// locales, optional
const locales = import.meta.glob("./locales/*.js");
const words = (name) =>
  locales[`./locales/${name}.js`]().then((x) => x.default);

export default class MyApp extends JetApp {
  constructor(config) {
    const defaults = {
      id: import.meta.env.VITE_APPNAME,
      version: import.meta.env.VITE_VERSION,
      router: import.meta.env.VITE_BUILD_AS_MODULE ? EmptyRouter : HashRouter,
      debug: !import.meta.env.PROD,
      start: "/home",
      // set custom view loader, mandatory
      views,
      state: {
        auth: new AuthModel(), // Authentication state model
      },
    };

    super({ ...defaults, ...config });

    // locales plugin, optional
    this.use(plugins.Locale, {
      path: words,
      storage: this.webix.storage.session,
    });
  }
}

if (!import.meta.env.VITE_BUILD_AS_MODULE) {
  webix.ready(() => {
    const app = new MyApp();
    window.app = app; // ⬅️ Set it globally
    app.render();
  });
}
