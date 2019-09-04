'use strict';

require('mocha');
const assert = require('assert').strict;
const strip = require('..');

describe('darwin', () => {
  describe('file name (stem)', () => {
    it('should remove mac-OS-style increments from a file name', () => {
      assert.equal(strip('foo copy.txt'), 'foo.txt');
      assert.equal(strip('foo copy 1.txt'), 'foo.txt');
      assert.equal(strip('foo copy 2.txt'), 'foo.txt');
      assert.equal(strip('foo copy 21.txt'), 'foo.txt');
      assert.equal(strip('foo copy 219 copy 219.txt'), 'foo.txt');
      assert.equal(strip('foo copy 219 (2).txt'), 'foo.txt');
    });

    it('should remove mac-OS-style increments from a folder name', () => {
      assert.equal(strip('foo copy'), 'foo');
      assert.equal(strip('foo copy 1'), 'foo');
      assert.equal(strip('foo copy 2'), 'foo');
      assert.equal(strip('foo copy 21'), 'foo');
      assert.equal(strip('foo copy 219 copy 219'), 'foo');
      assert.equal(strip('foo copy 219 (2)'), 'foo');
      assert.equal(strip('foo Copy'), 'foo');
      assert.equal(strip('foo Copy 1'), 'foo');
      assert.equal(strip('foo Copy 2'), 'foo');
      assert.equal(strip('foo Copy 21'), 'foo');
      assert.equal(strip('foo Copy 219 copy 219'), 'foo');
      assert.equal(strip('foo Copy 219 (2)'), 'foo');
    });

    it('should remove mac-OS-style increments from folder and file name', () => {
      assert.equal(strip('bar copy/foo copy 1.txt'), 'bar/foo.txt');
      assert.equal(strip('bar copy/foo copy 2.txt'), 'bar/foo.txt');
      assert.equal(strip('bar copy/foo copy 21.txt'), 'bar/foo.txt');
      assert.equal(strip('bar copy/foo copy 219 (2).txt'), 'bar/foo.txt');
      assert.equal(strip('bar copy/foo copy 219 copy 219.txt'), 'bar/foo.txt');
      assert.equal(strip('bar copy/foo copy.txt'), 'bar/foo.txt');
    });
  });

  describe('basename (stem + file extension)', () => {
    it('should remove mac-OS-style increments from a basename', () => {
      assert.equal(strip('foo copy.txt'), 'foo.txt');
      assert.equal(strip('foo copy 1.txt'), 'foo.txt');
      assert.equal(strip('foo copy 2.txt'), 'foo.txt');
      assert.equal(strip('foo copy 21.txt'), 'foo.txt');
      assert.equal(strip('foo copy 219 copy 219.txt'), 'foo.txt');
      assert.equal(strip('foo copy 219 (2).txt'), 'foo.txt');
    });

    it('should remove mac-OS-style increments from a basename', () => {
      assert.equal(strip('foo.(incomplete).txt'), 'foo.txt');
      assert.equal(strip('foo copy 219.(incomplete).txt'), 'foo.txt');
      assert.equal(strip('foo copy 219.(incomplete).(incomplete).(incomplete).txt'), 'foo.txt');
      assert.equal(strip('foo.(incomplete).(incomplete).txt'), 'foo.txt');
    });
  });
});
