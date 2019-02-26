import _regeneratorRuntime from "babel-runtime/regenerator";

var _marked = /*#__PURE__*/_regeneratorRuntime.mark(idMaker);

function idMaker() {
  var index;
  return _regeneratorRuntime.wrap(function idMaker$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          index = 0;

        case 1:
          if (!true) {
            _context.next = 6;
            break;
          }

          _context.next = 4;
          return index++;

        case 4:
          _context.next = 1;
          break;

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var gen = idMaker();

var genKey = function genKey() {
  return gen.next().value;
};

export default genKey;