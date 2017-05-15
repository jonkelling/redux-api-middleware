'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fetchEverywhere = require('fetch-everywhere');

var _fetchEverywhere2 = _interopRequireDefault(_fetchEverywhere);

var _lodashIsplainobject = require('lodash.isplainobject');

var _lodashIsplainobject2 = _interopRequireDefault(_lodashIsplainobject);

var _CALL_API = require('./CALL_API');

var _CALL_API2 = _interopRequireDefault(_CALL_API);

var _validation = require('./validation');

var _errors = require('./errors');

var _util = require('./util');

/**
 * A Redux middleware that processes RSAA actions.
 *
 * @type {ReduxMiddleware}
 * @access public
 */
function apiMiddleware(_ref) {
  var _this = this;

  var getState = _ref.getState;

  return function (next) {
    return function callee$2$0(action) {
      var validationErrors, _callAPI, _requestType, callAPI, endpoint, headers, method, body, credentials, bailout, types, _normalizeTypeDescriptors, _normalizeTypeDescriptors2, requestType, successType, failureType, res;

      return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            if ((0, _validation.isRSAA)(action)) {
              context$3$0.next = 2;
              break;
            }

            return context$3$0.abrupt('return', next(action));

          case 2:
            validationErrors = (0, _validation.validateRSAA)(action);

            if (!validationErrors.length) {
              context$3$0.next = 7;
              break;
            }

            _callAPI = action[_CALL_API2['default']];

            if (_callAPI.types && Array.isArray(_callAPI.types)) {
              _requestType = _callAPI.types[0];

              if (_requestType && _requestType.type) {
                _requestType = _requestType.type;
              }
              next({
                type: _requestType,
                payload: new _errors.InvalidRSAA(validationErrors),
                error: true
              });
            }
            return context$3$0.abrupt('return');

          case 7:
            callAPI = action[_CALL_API2['default']];
            endpoint = callAPI.endpoint;
            headers = callAPI.headers;
            method = callAPI.method;
            body = callAPI.body;
            credentials = callAPI.credentials;
            bailout = callAPI.bailout;
            types = callAPI.types;
            _normalizeTypeDescriptors = (0, _util.normalizeTypeDescriptors)(types);
            _normalizeTypeDescriptors2 = _slicedToArray(_normalizeTypeDescriptors, 3);
            requestType = _normalizeTypeDescriptors2[0];
            successType = _normalizeTypeDescriptors2[1];
            failureType = _normalizeTypeDescriptors2[2];
            context$3$0.prev = 20;

            if (!(typeof bailout === 'boolean' && bailout || typeof bailout === 'function' && bailout(getState()))) {
              context$3$0.next = 23;
              break;
            }

            return context$3$0.abrupt('return');

          case 23:
            context$3$0.next = 31;
            break;

          case 25:
            context$3$0.prev = 25;
            context$3$0.t0 = context$3$0['catch'](20);
            context$3$0.next = 29;
            return regeneratorRuntime.awrap((0, _util.actionWith)(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].bailout function failed'),
              error: true
            }), [action, getState()]));

          case 29:
            context$3$0.t1 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t1));

          case 31:
            if (!(typeof endpoint === 'function')) {
              context$3$0.next = 42;
              break;
            }

            context$3$0.prev = 32;

            endpoint = endpoint(getState());
            context$3$0.next = 42;
            break;

          case 36:
            context$3$0.prev = 36;
            context$3$0.t2 = context$3$0['catch'](32);
            context$3$0.next = 40;
            return regeneratorRuntime.awrap((0, _util.actionWith)(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].endpoint function failed'),
              error: true
            }), [action, getState()]));

          case 40:
            context$3$0.t3 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t3));

          case 42:
            if (!(typeof headers === 'function')) {
              context$3$0.next = 53;
              break;
            }

            context$3$0.prev = 43;

            headers = headers(getState());
            context$3$0.next = 53;
            break;

          case 47:
            context$3$0.prev = 47;
            context$3$0.t4 = context$3$0['catch'](43);
            context$3$0.next = 51;
            return regeneratorRuntime.awrap((0, _util.actionWith)(_extends({}, requestType, {
              payload: new _errors.RequestError('[CALL_API].headers function failed'),
              error: true
            }), [action, getState()]));

          case 51:
            context$3$0.t5 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t5));

          case 53:
            context$3$0.next = 55;
            return regeneratorRuntime.awrap((0, _util.actionWith)(requestType, [action, getState()]));

          case 55:
            context$3$0.t6 = context$3$0.sent;
            next(context$3$0.t6);
            context$3$0.prev = 57;
            context$3$0.next = 60;
            return regeneratorRuntime.awrap((0, _fetchEverywhere2['default'])(endpoint, { method: method, body: body, credentials: credentials, headers: headers }));

          case 60:
            res = context$3$0.sent;
            context$3$0.next = 69;
            break;

          case 63:
            context$3$0.prev = 63;
            context$3$0.t7 = context$3$0['catch'](57);
            context$3$0.next = 67;
            return regeneratorRuntime.awrap((0, _util.actionWith)(_extends({}, requestType, {
              payload: new _errors.RequestError(context$3$0.t7.message),
              error: true
            }), [action, getState()]));

          case 67:
            context$3$0.t8 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t8));

          case 69:
            if (!res.ok) {
              context$3$0.next = 76;
              break;
            }

            context$3$0.next = 72;
            return regeneratorRuntime.awrap((0, _util.actionWith)(successType, [action, getState(), res]));

          case 72:
            context$3$0.t9 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t9));

          case 76:
            context$3$0.next = 78;
            return regeneratorRuntime.awrap((0, _util.actionWith)(_extends({}, failureType, {
              error: true
            }), [action, getState(), res]));

          case 78:
            context$3$0.t10 = context$3$0.sent;
            return context$3$0.abrupt('return', next(context$3$0.t10));

          case 80:
          case 'end':
            return context$3$0.stop();
        }
      }, null, _this, [[20, 25], [32, 36], [43, 47], [57, 63]]);
    };
  };
}

exports.apiMiddleware = apiMiddleware;

// Do not process actions without a [CALL_API] property

// Try to dispatch an error request FSA for invalid RSAAs

// Parse the validated RSAA action

// Should we bail out?

// Process [CALL_API].endpoint function

// Process [CALL_API].headers function

// We can now dispatch the request FSA

// Make the API call

// The request was malformed, or there was a network error

// Process the server response