'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _errors = require('./errors');

/**
 * Extract JSON body from a server response
 *
 * @function getJSON
 * @access public
 * @param {object} res - A raw response object
 * @returns {promise|undefined}
 */
function getJSON(res) {
  var contentType, emptyCodes;
  return regeneratorRuntime.async(function getJSON$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        contentType = res.headers.get('Content-Type');
        emptyCodes = [204, 205];

        if (!(! ~emptyCodes.indexOf(res.status) && contentType && ~contentType.indexOf('json'))) {
          context$1$0.next = 8;
          break;
        }

        context$1$0.next = 5;
        return regeneratorRuntime.awrap(res.json());

      case 5:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 8:
        context$1$0.next = 10;
        return regeneratorRuntime.awrap(Promise.resolve());

      case 10:
        return context$1$0.abrupt('return', context$1$0.sent);

      case 11:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

/**
 * Blow up string or symbol types into full-fledged type descriptors,
 *   and add defaults
 *
 * @function normalizeTypeDescriptors
 * @access private
 * @param {array} types - The [CALL_API].types from a validated RSAA
 * @returns {array}
 */
function normalizeTypeDescriptors(types) {
  var _types = _slicedToArray(types, 3);

  var requestType = _types[0];
  var successType = _types[1];
  var failureType = _types[2];

  if (typeof requestType === 'string' || typeof requestType === 'symbol') {
    requestType = { type: requestType };
  }

  if (typeof successType === 'string' || typeof successType === 'symbol') {
    successType = { type: successType };
  }
  successType = _extends({
    payload: function payload(action, state, res) {
      return getJSON(res);
    }
  }, successType);

  if (typeof failureType === 'string' || typeof failureType === 'symbol') {
    failureType = { type: failureType };
  }
  failureType = _extends({
    payload: function payload(action, state, res) {
      return getJSON(res).then(function (json) {
        return new _errors.ApiError(res.status, res.statusText, json);
      });
    }
  }, failureType);

  return [requestType, successType, failureType];
}

/**
 * Evaluate a type descriptor to an FSA
 *
 * @function actionWith
 * @access private
 * @param {object} descriptor - A type descriptor
 * @param {array} args - The array of arguments for `payload` and `meta` function properties
 * @returns {object}
 */
function actionWith(descriptor, args) {
  return regeneratorRuntime.async(function actionWith$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        context$1$0.prev = 0;
        context$1$0.next = 3;
        return regeneratorRuntime.awrap(typeof descriptor.payload === 'function' ? descriptor.payload.apply(descriptor, _toConsumableArray(args)) : descriptor.payload);

      case 3:
        descriptor.payload = context$1$0.sent;
        context$1$0.next = 10;
        break;

      case 6:
        context$1$0.prev = 6;
        context$1$0.t0 = context$1$0['catch'](0);

        descriptor.payload = new _errors.InternalError(context$1$0.t0.message);
        descriptor.error = true;

      case 10:
        context$1$0.prev = 10;
        context$1$0.next = 13;
        return regeneratorRuntime.awrap(typeof descriptor.meta === 'function' ? descriptor.meta.apply(descriptor, _toConsumableArray(args)) : descriptor.meta);

      case 13:
        descriptor.meta = context$1$0.sent;
        context$1$0.next = 21;
        break;

      case 16:
        context$1$0.prev = 16;
        context$1$0.t1 = context$1$0['catch'](10);

        delete descriptor.meta;
        descriptor.payload = new _errors.InternalError(context$1$0.t1.message);
        descriptor.error = true;

      case 21:
        return context$1$0.abrupt('return', descriptor);

      case 22:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this, [[0, 6], [10, 16]]);
}

exports.getJSON = getJSON;
exports.normalizeTypeDescriptors = normalizeTypeDescriptors;
exports.actionWith = actionWith;