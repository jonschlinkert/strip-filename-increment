'use strict';

require('mocha');
var assert = require('assert');
var stripIncrement = require('./');

describe('stripIncrement', function() {
  describe('filename (stem)', function() {
    it('should strip windows-style increments from a filename', function() {
      assert.equal(stripIncrement('foo (1)'), 'foo');
      assert.equal(stripIncrement('foo (2)'), 'foo');
      assert.equal(stripIncrement('foo (22)'), 'foo');
    });

    it('should strip windows-style increments when separated by a dash', function() {
      assert.equal(stripIncrement('foo (3) - Copy'), 'foo');
      assert.equal(stripIncrement('foo (31) - Copy - Copy'), 'foo');
    });

    it('should strip OS-style increments from a filename', function() {
      assert.equal(stripIncrement('foo copy'), 'foo');
      assert.equal(stripIncrement('foo copy 1'), 'foo');
      assert.equal(stripIncrement('foo copy 2'), 'foo');
      assert.equal(stripIncrement('foo copy 21'), 'foo');
      assert.equal(stripIncrement('foo copy 219 copy 219'), 'foo');
      assert.equal(stripIncrement('foo copy 219 (2)'), 'foo');
      assert.equal(stripIncrement('foo Copy'), 'foo');
      assert.equal(stripIncrement('foo Copy 1'), 'foo');
      assert.equal(stripIncrement('foo Copy 2'), 'foo');
      assert.equal(stripIncrement('foo Copy 21'), 'foo');
      assert.equal(stripIncrement('foo Copy 219 copy 219'), 'foo');
      assert.equal(stripIncrement('foo Copy 219 (2)'), 'foo');
    });

    it('should strip (incomplete) from a filename', function() {
      assert.equal(stripIncrement('foo.(incomplete)'), 'foo');
      assert.equal(stripIncrement('foo copy 219.(incomplete)'), 'foo');
      assert.equal(stripIncrement('foo copy 219.(incomplete).(incomplete).(incomplete)'), 'foo');
      assert.equal(stripIncrement('foo.(incomplete).(incomplete)'), 'foo');
    });

    it('should not strip a non-increment from a filename', function() {
      assert.equal(stripIncrement('foo 1'), 'foo 1');
      assert.equal(stripIncrement('foo [1]'), 'foo [1]');
      assert.equal(stripIncrement('foo (1) 1'), 'foo (1) 1');
    });
  });

  describe('basename (stem + file extension)', function() {
    it('should strip windows-style increments from a basename', function() {
      assert.equal(stripIncrement('foo (1).txt'), 'foo.txt');
      assert.equal(stripIncrement('foo (2).txt'), 'foo.txt');
      assert.equal(stripIncrement('foo (22).txt'), 'foo.txt');
    });

    it('should strip OS-style increments from a basename', function() {
      assert.equal(stripIncrement('foo copy.txt'), 'foo.txt');
      assert.equal(stripIncrement('foo copy 1.txt'), 'foo.txt');
      assert.equal(stripIncrement('foo copy 2.txt'), 'foo.txt');
      assert.equal(stripIncrement('foo copy 21.txt'), 'foo.txt');
      assert.equal(stripIncrement('foo copy 219 copy 219.txt'), 'foo.txt');
      assert.equal(stripIncrement('foo copy 219 (2).txt'), 'foo.txt');
    });

    it('should strip OS-style increments from a basename', function() {
      assert.equal(stripIncrement('foo.(incomplete).txt'), 'foo.txt');
      assert.equal(stripIncrement('foo copy 219.(incomplete).txt'), 'foo.txt');
      assert.equal(stripIncrement('foo copy 219.(incomplete).(incomplete).(incomplete).txt'), 'foo.txt');
      assert.equal(stripIncrement('foo.(incomplete).(incomplete).txt'), 'foo.txt');
    });

    it('should not strip a non-increment from a basename', function() {
      assert.equal(stripIncrement('foo 1.txt'), 'foo 1.txt');
      assert.equal(stripIncrement('foo [1].txt'), 'foo [1].txt');
      assert.equal(stripIncrement('foo (1) 1.txt'), 'foo (1) 1.txt');
    });
  });
});
