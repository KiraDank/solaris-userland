"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.strictEqual = strictEqual;
exports.shallowEqual = shallowEqual;
exports.arrayShallowEqual = arrayShallowEqual;
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at <http://mozilla.org/MPL/2.0/>. */

function strictEqual(value, other) {
  return value === other;
}

function shallowEqual(value, other) {
  return value === other || Array.isArray(value) && Array.isArray(other) && arrayShallowEqual(value, other) || isObject(value) && isObject(other) && objectShallowEqual(value, other);
}

function arrayShallowEqual(value, other) {
  return value.length === other.length && value.every((k, i) => k === other[i]);
}

function objectShallowEqual(value, other) {
  const existingKeys = Object.keys(other);
  const keys = Object.keys(value);

  return keys.length === existingKeys.length && keys.every((k, i) => k === existingKeys[i]) && keys.every(k => value[k] === other[k]);
}

function isObject(value) {
  return typeof value === "object" && !!value;
}