"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class LogDnaProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.extend("Adonis/Src/Logger", "logdna", () => {
      const logger = require("../src/index");
      return new logger();
    });
  }
}

module.exports = LogDnaProvider;
