'use strict';

require('mocha');
const assert = require('assert').strict;
const strip = require('..');

describe('linux', () => {
  describe('basename (stem + extension)', () => {
    it('should remove linux-style increments from a file name', () => {
      assert.equal(strip('foo (copy).txt', { platform: 'linux' }), 'foo.txt');
      assert.equal(strip('foo (another copy).txt', { platform: 'linux' }), 'foo.txt');
      assert.equal(strip('foo (3rd copy).txt', { platform: 'linux' }), 'foo.txt');
      assert.equal(strip('foo (4th copy).txt', { platform: 'linux' }), 'foo.txt');
      assert.equal(strip('foo (5th copy).txt', { platform: 'linux' }), 'foo.txt');
      assert.equal(strip('foo (111th copy).txt', { platform: 'linux' }), 'foo.txt');
    });
  });

  describe('folder name', () => {
    it('should remove linux-style increments from a folder name', () => {
      assert.equal(strip('foo (copy)', { platform: 'linux' }), 'foo');
      assert.equal(strip('foo (another copy)', { platform: 'linux' }), 'foo');
      assert.equal(strip('foo (3rd copy)', { platform: 'linux' }), 'foo');
      assert.equal(strip('foo (4th copy)', { platform: 'linux' }), 'foo');
      assert.equal(strip('foo (5th copy)', { platform: 'linux' }), 'foo');
      assert.equal(strip('foo (111th copy)', { platform: 'linux' }), 'foo');
    });

    it('should not remove non-incremental numbers from a folder name', () => {
      assert.equal(strip('foo 1 (copy)', { platform: 'linux' }), 'foo 1');
      assert.equal(strip('foo 1 (another copy)', { platform: 'linux' }), 'foo 1');
      assert.equal(strip('foo 1 (3rd copy)', { platform: 'linux' }), 'foo 1');
      assert.equal(strip('foo 1 (4th copy)', { platform: 'linux' }), 'foo 1');
      assert.equal(strip('foo 1 (5th copy)', { platform: 'linux' }), 'foo 1');
      assert.equal(strip('foo 1 (111th copy)', { platform: 'linux' }), 'foo 1');
    });
  });
});
