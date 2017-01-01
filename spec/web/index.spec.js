(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
;
var src_1 = require("../src");
var result = {};
beforeEach(function () {
    delete result.value;
    delete result.error;
});
describe('getShuffle (opts?: Partial<ShuffleFactorySpecs>): ' +
    '<T>(arr: T[]) => T[]', function () {
    describe('when called without argument', function () {
        beforeEach(function () {
            try {
                result.value = src_1.default();
            }
            catch (err) {
                result.error = err;
            }
        });
        it('returns the default `shuffle <T>(arr: T[]): T[]` function', function () {
            expect(result.error).toBeUndefined();
            expect(result.value).toEqual(jasmine.any(Function));
        });
    });
});
describe('shuffle <T>(arr: T[]): T[]', function () {
    describe('when given an Array instance with up to 32768 elements', function () {
        var arr;
        var randomwords;
        beforeEach(function () {
            arr = [1, 2, 3, 4];
            randomwords = jasmine.createSpy('randomwords')
                .and.returnValue(new Uint16Array([65535, 65538 / 3, 0]));
            var shuffle = src_1.default();
            var mockedShuffle = src_1.default({ randomwords: randomwords });
            try {
                result.value = [mockedShuffle(arr), shuffle(new Array(32768))];
            }
            catch (err) {
                result.error = err;
            }
        });
        it('returns a new Array instance of the same length, ' +
            'containing all elements of the input array in random order', function () {
            expect(result.error).toBeUndefined();
            expect(result.value.length).toBe(2);
            expect(result.value[0]).toEqual([4, 3, 2, 1]);
            expect(result.value[1]).toEqual(jasmine.any(Array));
            expect(result.value[1].length).toBe(32768);
            expect(arr).toEqual([1, 2, 3, 4]);
            expect(randomwords).toHaveBeenCalledWith(3);
        });
    });
    describe('when given an Array instance with more than 32768 elements, ' +
        'or anything else than an Array instance', function () {
        beforeEach(function () {
            var shuffle = src_1.default();
            result.value = [];
            result.error = [];
            [new Array(32769), true, 42, 'foo', function () { }, { foo: 'foo' }]
                .reduce(function (result, arg) {
                try {
                    result.value.push(shuffle(arg));
                }
                catch (err) {
                    result.error.push(err);
                }
                return result;
            }, result);
        });
        it('throws an `invalid argument` TypeError', function () {
            expect(result.value.length).toBe(0);
            expect(result.error.length).toBe(6);
            result.error.forEach(function (error) {
                expect(error).toEqual(jasmine.any(TypeError));
                expect(error.message).toBe('invalid argument');
            });
        });
    });
});

},{"../src":2}],2:[function(require,module,exports){
"use strict";
;
var randomwords_1 = require("randomwords");
function getShuffle(opts) {
    var randomwords = opts && opts.randomwords || randomwords_1.default();
    return function shuffle(arr) {
        if (!isValidArray(arr)) {
            throw new TypeError('invalid argument');
        }
        return randomwords(arr.length - 1)
            .reduceRight(function (shuffled, rnd, index) {
            var i = index + 1;
            var j = rnd ? (rnd * (i + 1)) >> 16 : 0;
            return swap(shuffled, i, j);
        }, arr.slice());
    };
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getShuffle;
function isValidArray(val) {
    return Array.isArray(val) && (val.length <= 32768);
}
function swap(arr, i, j) {
    if (i === j) {
        return arr;
    }
    var val = arr[j];
    arr[j] = arr[i];
    arr[i] = val;
    return arr;
}

},{"randomwords":undefined}]},{},[1]);
