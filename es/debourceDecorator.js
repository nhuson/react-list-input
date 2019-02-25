import { debounce } from 'lodash';

export default (function (wait, opts) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var func = args[2].value;
    return debounce(func, wait, opts);
  };
});