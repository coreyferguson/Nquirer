
import { expect, sinon } from '../support/test-utils';
import { nconf, necessitate, getQuestions, reset } from '../../src/nquirer';
import deepFreeze from 'deep-freeze';

describe('nquirer unit test', function() {

  afterEach(function() {
    reset();
  });

  it('reset questions', function() {
    necessitate([{ property1: 'value1' }]);
    reset();
    expect(getQuestions()).to.eql([]);
  });

  it('reset nconf', function() {
    expect(nconf.get('property1')).to.eql(undefined);
    nconf.file({ file: 'test/data/config.json' });
    nconf.set('new property', 'new value');
    nconf.set('property1', 'value1');
    expect(nconf.get('new property')).to.eql('new value');
    reset();
    nconf.file({ file: 'test/data/config.json' });
    expect(nconf.get('new property')).to.eql(undefined);
    expect(nconf.get('property1')).to.eql('value1');
  });

  it('load config from file', function() {
    nconf.file({ file: 'test/data/config.json' });
    expect(nconf.get('property1')).to.eql('value1');
  });

  it('necessitate adds to existing questions', function() {
    necessitate([
      { property1: 'value1' }
    ]);
    expect(getQuestions()).to.eql([
      { property1: 'value1' }
    ]);
    necessitate([
      { property2: 'value2' },
      { property3: 'value3' }
    ]);
    expect(getQuestions()).to.eql([
      { property1: 'value1' },
      { property2: 'value2' },
      { property3: 'value3' }
    ]);
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
