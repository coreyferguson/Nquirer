
import nconf from 'nconf';

/**
 * Default export is reference to nconf instance.
 * @module Nquirer
 */
export default config = nconf;

/**
 * Retrieve configuration. Prompt for missing configurations.
 * @returns {Promise.<nconf>}
 */
export function inquire() {
}

/**
 * Add required configuration options in the form of Inquirer questions.
 * @param {Question[]} questions
 * @see {@link https://github.com/SBoudrias/Inquirer.js/#question|Inquirer Question}
 */
export function require(questions) {
}
