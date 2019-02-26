import _append from 'ramda/src/append';
import _identity from 'ramda/src/identity';
import _update from 'ramda/src/update';
import _remove from 'ramda/src/remove';
import _propEq from 'ramda/src/propEq';
import _findIndex from 'ramda/src/findIndex';
import _equals from 'ramda/src/equals';
import _prop from 'ramda/src/prop';
import _map from 'ramda/src/map';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _desc, _value, _class, _class2, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import React from 'react';
import { debounce, invert } from 'lodash';
import genKey from './genKey';
import Sortable from 'react-drag-sort';

/**
 * @name ListInput
 *
 * an input for a variable-length
 * list of items
 *
 * handles keys and dragging automatically
 *
 * these are the propTypes:
 */

var propTypes = {
  ItemComponent: PropTypes.func.isRequired,
  StagingComponent: PropTypes.func.isRequired,
  value: PropTypes.any.isRequired,
  initialStagingValue: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  maxItems: PropTypes.number,
  minItems: PropTypes.number

  /*
   * ItemComponent is passed
   *   - decorateHandle (func) element -> element
   *     make an element the drag hanldle
   *     feel free to pass your whole component in
   *
   *   - onChange (func)
   *
   *   - onRemove (func)
   *
   *   - removable (bool)
   *
   *   - value (any)
   *
   * StagingComponent is passed:
   *
   *   - value (any)
   *
   *   - onChange (func) any -> void
   *     update the staged value
   *
   *   - add (func) any -> void
   *     add a given value and reset the staged value
   *
   *   - onAdd (func) void -> void
   *     add from the staging area and reset the staged value
   *
   *   - canAdd (bool)
   */

};var addKey = function addKey(value) {
  return {
    value: value,
    key: genKey()
  };
};
var addKeys = _map(addKey);

var removeKey = _prop('value');
var removeKeys = _map(removeKey);

var ListInput = (_class = (_temp = _class2 = function (_React$Component) {
  _inherits(ListInput, _React$Component);

  function ListInput(props) {
    _classCallCheck(this, ListInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.maybeRefreshKeys = debounce(_this.maybeRefreshKeys, 50);

    _this.state = {
      value: addKeys(props.value),
      stagedValue: props.initialStagingValue,
      WrappedItemComponent: null
    };
    return _this;
  }

  ListInput.prototype.componentWillMount = function componentWillMount() {
    this.updateWrappedItemComponent();
  };

  ListInput.prototype.componentWillUpdate = function componentWillUpdate(nextProps, nextState) {
    if (nextProps.value.length !== this.props.value.length) {
      this.updateWrappedItemComponent();
    }
  };

  ListInput.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.maybeRefreshKeys(nextProps);
  };

  ListInput.prototype.maybeRefreshKeys = function maybeRefreshKeys(nextProps) {
    if (_equals(removeKeys(this.state.value), nextProps.value)) return;
    this.setState({
      value: addKeys(nextProps.value)
    });
  };

  ListInput.prototype.resetStagingValue = function resetStagingValue() {
    this.setState({
      stagedValue: this.props.initialStagingValue
    });
  };

  ListInput.prototype.changeState = function changeState(value) {
    this.setState({
      value: value
    });
    this.props.onChange(removeKeys(value));
  };

  ListInput.prototype.findWithSameKey = function findWithSameKey(v) {
    return _findIndex(_propEq('key', v.key), this.state.value);
  };

  ListInput.prototype.remove = function remove(v) {
    var index = this.findWithSameKey(v);
    var newValue = _remove(index, 1, this.state.value);

    this.changeState(newValue);
  };

  ListInput.prototype.change = function change(v) {
    var index = this.findWithSameKey(v);
    var newValue = _update(index, v, this.state.value);
    this.changeState(newValue);
  };

  ListInput.prototype.makeItemComponentWrapper = function makeItemComponentWrapper(_ref) {
    var _this2 = this;

    var ItemComponent = _ref.ItemComponent,
        minItems = _ref.minItems;

    return function (_ref2) {
      var value = _ref2.value,
          onChange = _ref2.onChange,
          decorateHandle = _ref2.decorateHandle,
          onRemove = _ref2.onRemove;

      var removable = _this2.props.value.length > (_this2.props.minItems || 0);
      var item = invert(_this2.props.value);
      return React.createElement(ItemComponent, _extends({
        ItemComponent: ItemComponent,
        decorateHandle: decorateHandle,
        value: value
      }, {
        removable: removable,
        onChange: onChange,
        value: value,
        onRemove: removable ? onRemove : _identity,
        item: item
      }));
    };
  };

  ListInput.prototype.updateWrappedItemComponent = function updateWrappedItemComponent() {
    this.setState({
      WrappedItemComponent: this.makeItemComponentWrapper({
        ItemComponent: this.props.ItemComponent,
        minItems: this.props.minItems,
        value: this.props.value,
        change: this.change,
        remove: this.remove
      })
    });
  };

  ListInput.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        value = _props.value,
        StagingComponent = _props.StagingComponent,
        initialStagingValue = _props.initialStagingValue,
        _maxItems = _props.maxItems;


    var maxItems = _maxItems || 5;

    var addFromStaging = function addFromStaging() {
      var newValue = _append(addKey(_this3.state.stagedValue), _this3.state.value);

      _this3.changeState(newValue);
      _this3.resetStagingValue();
    };

    var add = function add(v) {
      var newValue = _append(addKey(v), _this3.state.value);

      _this3.changeState(newValue);
      _this3.resetStagingValue();
    };

    return React.createElement(
      'div',
      { className: 'list-input-react' },
      value.length < maxItems && React.createElement(StagingComponent, {
        onAdd: addFromStaging,
        canAdd: this.state.value.length < maxItems && !_equals(this.state.stagedValue, initialStagingValue),
        add: add,
        value: this.state.stagedValue,
        onChange: function onChange(stagedValue) {
          _this3.setState({ stagedValue: stagedValue });
        }
      }),
      value && React.createElement(
        'div',
        { className: 'item-drag-input' },
        React.createElement(Sortable, {
          collection: this.state.value,
          onChange: this.changeState,
          Component: this.state.WrappedItemComponent
        })
      )
    );
  };

  return ListInput;
}(React.Component), _class2.displayName = 'ListInput', _temp), (_applyDecoratedDescriptor(_class.prototype, 'maybeRefreshKeys', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'maybeRefreshKeys'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'resetStagingValue', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'resetStagingValue'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'changeState', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'changeState'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'findWithSameKey', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'findWithSameKey'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'remove', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'remove'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'change', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'change'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'makeItemComponentWrapper', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'makeItemComponentWrapper'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateWrappedItemComponent', [autobind], Object.getOwnPropertyDescriptor(_class.prototype, 'updateWrappedItemComponent'), _class.prototype)), _class);
process.env.NODE_ENV !== "production" ? ListInput.propTypes = propTypes : void 0;


export default ListInput;