'use strict';
const logger = require('../src/middlewares/logger');

describe('logger middlewares', () => {
  let consoleSpy; 
  let req = {};
  let res = {};
  let next = jest.fn();

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log');
  });

  test('Can successfully logging something or routes', () => {
    logger(req, res, next);
    expect(consoleSpy).toHaveBeenCalled();
  });
  test('Can successfully calling next', () => {
    expect(next).toHaveBeenCalled();
  });
});