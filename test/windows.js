'use strict';

require('mocha');
const path = require('path');
const assert = require('assert').strict;
const strip = require('..');

describe('windows', () => {
  describe('folders or files without extensions', () => {
    it('should remove windows-style increments from a file name', () => {
      assert.equal(strip('foo (1)'), 'foo');
      assert.equal(strip('foo (2)'), 'foo');
      assert.equal(strip('foo (22)'), 'foo');
    });

    it('should not remove non-increments', () => {
      assert.equal(strip('foo 1'), 'foo 1');
      assert.equal(strip('foo (1) 1'), 'foo (1) 1');
      assert.equal(strip('foo [1]'), 'foo [1]');
    });

    it('should not remove non-increments', () => {
      assert.equal(strip('foo 1', { removeRawNumbers: true }), 'foo');
      assert.equal(strip('foo (1) 1', { removeRawNumbers: true }), 'foo');
      assert.equal(strip('foo [1]', { removeRawNumbers: true }), 'foo [1]');
    });

    it('should remove windows-style increments from absolute paths', () => {
      assert.equal(strip(path.resolve('foo (1)')), path.resolve('foo'));
      assert.equal(strip(path.resolve('foo (2)')), path.resolve('foo'));
      assert.equal(strip(path.resolve('foo (22)')), path.resolve('foo'));
    });

    it('should remove dash-separated windows-style increments', () => {
      assert.equal(strip('foo (3) - Copy'), 'foo');
      assert.equal(strip('foo (31) - Copy - Copy'), 'foo');
    });
  });

  describe('basename (stem + extension)', () => {
    it('should remove windows-style increments from a basename', () => {
      assert.equal(strip('foo (1).txt'), 'foo.txt');
      assert.equal(strip('foo (2).txt'), 'foo.txt');
      assert.equal(strip('foo (22).txt'), 'foo.txt');
      assert.equal(strip('foo copy (22).txt'), 'foo.txt');
      assert.equal(strip('foo Copy (22).txt'), 'foo.txt');
    });
  });
});
