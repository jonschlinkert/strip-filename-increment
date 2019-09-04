'use strict';

require('mocha');
const assert = require('assert').strict;
const strip = require('..');

describe('non-standard', () => {
  describe('foldres or files without extensions', () => {
    it('should not remove raw numbers from file names by default', () => {
      assert.equal(strip('foo 1'), 'foo 1');
      assert.equal(strip('foo 2'), 'foo 2');
    });

    it('should remove raw numbers from file names when specified on options', () => {
      assert.equal(strip('foo 1', { removeRawNumbers: true }), 'foo');
      assert.equal(strip('foo 2', { removeRawNumbers: true }), 'foo');
    });

    it('should remove (incomplete) from a file name', () => {
      assert.equal(strip('foo.(incomplete)'), 'foo');
      assert.equal(strip('foo copy 219.(incomplete)'), 'foo');
      assert.equal(strip('foo copy 219.(incomplete).(incomplete).(incomplete)'), 'foo');
      assert.equal(strip('foo.(incomplete).(incomplete)'), 'foo');
    });

    it('should remove (incomplete) from a file name with extension', () => {
      assert.equal(strip('foo.(incomplete).txt'), 'foo.txt');
      assert.equal(strip('foo copy 219.(incomplete).txt'), 'foo.txt');
      assert.equal(strip('foo copy 219.(incomplete).(incomplete).(incomplete).txt'), 'foo.txt');
      assert.equal(strip('foo.(incomplete).(incomplete).txt'), 'foo.txt');
    });

    it('should not remove a non-increment from a file or folder name', () => {
      assert.equal(strip('foo [1]'), 'foo [1]');
      assert.equal(strip('foo [1].txt'), 'foo [1].txt');
      assert.equal(strip('bar [1]/foo [1].txt'), 'bar [1]/foo [1].txt');
      assert.equal(strip('bar[1]/foo[1].txt'), 'bar[1]/foo[1].txt');
    });
  });

  describe('basename (stem + file extension)', () => {
    it('should not remove a non-increment from a basename', () => {
      assert.equal(strip('foo [1].txt'), 'foo [1].txt');
    });
  });
});
