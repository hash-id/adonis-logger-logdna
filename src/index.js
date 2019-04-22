"use strict";

const _ = require("lodash");
const winston = require("winston");
const logdnaWinston = require("logdna-winston");

/**
 * Winston console transport driver for @ref('Logger')
 * All the logs will be sent to logDNA.
 *
 * @class WinstonLogDna
 * @constructor
 */
class WinstonLogDna {
  /**
   * Set config. This method is called by Logger
   * manager by set config based upon the
   * transport in use.
   *
   * @method setConfig
   *
   * @param  {Object}  config
   */
  setConfig(config) {
    this.config = Object.assign(
      {},
      {
        name: "adonis-app",
        level: "info",
        index_meta: true,
        timestamp: new Date().toLocaleTimeString(),
        allowEnv: ["production"]
      },
      config
    );

    /**
     * Creating new instance of winston with file transport
     */
    const transportList = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.splat(),
          winston.format.simple()
        )
      })
    ];

    /**
     * if current ENV is whitelisted in allowEnv, enable LogDNA
     */
    if (this.config.allowEnv.includes(this.config.env) === true) {
      transportList.push(new logdnaWinston(this.config));
    }
    this.logger = winston.createLogger({
      levels: this.levels,
      transports: transportList
    });

    /**
     * Updating winston levels with syslog standard levels.
     */
    this.logger.setLevels(this.levels);
  }

  /**
   * A list of available log levels.
   *
   * @attribute levels
   *
   * @return {Object}
   */
  get levels() {
    return {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7
    };
  }

  /**
   * Returns the current level for the driver
   *
   * @attribute level
   *
   * @return {String}
   */
  get level() {
    return this.logger.transports[0].level;
  }

  /**
   * Update driver log level at runtime
   *
   * @param  {String} level
   *
   * @return {void}
   */
  set level(level) {
    this.logger.transports[0].level = level;
  }

  /**
   * Log message for a given level
   *
   * @method log
   *
   * @param  {Number}    level
   * @param  {String}    msg
   * @param  {...Spread} meta
   *
   * @return {void}
   */
  log(level, msg, ...meta) {
    const levelName = _.findKey(this.levels, num => {
      return num === level;
    });
    this.logger.log(levelName, msg, ...meta);
  }
}

module.exports = WinstonLogDna;
