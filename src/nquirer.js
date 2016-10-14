
import nconfLib from 'nconf';

/**
 * @module Nquirer
 */

let _questions = [];

/**
 * Resolves to nconf configuration.
 * User will be prompted for missing configuration previously specified
 * by the {@link require} function.
 * @returns {Promise.<nconf>}
 */
export function inquire() {
};

/**
 * Reference to nconf instance.
 */
export const nconf = nconfLib;

/**
 * Add required configuration options in the form of Inquirer questions.
 * @param {Question[]} questions
 * @see {@link https://github.com/SBoudrias/Inquirer.js/#question|Inquirer Question}
 */
export function necessitate(questions) {
  _questions = [
    ..._questions,
    ...questions.map(question => Object.assign({}, question))
  ];
};

/**
 * Resets nconf configuration and removes all required configuration options.
 */
export function reset() {
  _questions = [];
  nconf.reset();
};

/**
 * Get current necessary questions.
 * @returns {Question[]}
 */
export function getQuestions() {
  return _questions.map((currentValue) => {
    return Object.assign({}, currentValue);
  });
};
