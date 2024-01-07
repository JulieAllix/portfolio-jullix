"use strict";
exports.__esModule = true;
exports.getSeriesOf = exports.getRandomIndex = exports.getRandomNumber = void 0;
var getRandomNumber = function (range) {
    // Choose a random index for an array
    return Math.floor(Math.random() * range);
};
exports.getRandomNumber = getRandomNumber;
var getRandomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
};
exports.getRandomIndex = getRandomIndex;
var getSeriesOf = function (builder, count) {
    var results = [];
    for (var index = 0; index < count; index++) {
        results.push(builder());
    }
    return results;
};
exports.getSeriesOf = getSeriesOf;
