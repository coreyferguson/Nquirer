
import nconfLib from 'nconf';
import inquirer from 'inquirer';

/**
 * @module Nquirer
 */

let _questions = [];

/**
 * Reference to nconf instance.
 */
export const nconf = nconfLib;

/**
 * Resolves to nconf configuration.
 * User will be prompted for missing configuration previously specified
 * by the `necessitate` function. Answers automatically set in nconf.
 * @returns {Promise.<nconf>}
 */
export function inquire() {
  return inquirer.prompt(_questions).then(answers => {
    for (let key in answers) {
      nconf.set(key, answers[key]);
    }
    return nconf;
  });
};

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
