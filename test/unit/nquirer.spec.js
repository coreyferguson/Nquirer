
import { expect, sinon } from '../support/test-utils';
import { necessitate, getQuestions, reset } from '../../src/nquirer';
import deepFreeze from 'deep-freeze';

describe('nquirer unit test', function() {

  afterEach(function() {
    reset();
  });

  it('reset', function() {
    necessitate([{ property1: 'value1' }]);
    reset();
    expect(getQuestions()).to.eql([]);
  });

  it('necessitate, cannot modify input', function() {
    const questions = [{ property1: 'init' }];
    const expectation = [{ property1: 'init' }];
    necessitate(questions);
    questions[0].property1 = 'modification 1';
    expect(getQuestions()).to.eql(expectation);
  });

  it('getQuestions, cannot modify output', function() {
    const questions = [{ property1: 'init' }];
    const expectation = [{ property1: 'init' }];
    necessitate(questions);
    const questionsAfter = getQuestions();
    questionsAfter.push({ property2: 'value2' });
    questionsAfter[0].property1 = 'modification 2';
    expect(getQuestions()).to.eql(expectation);
  });

});
