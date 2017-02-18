'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _KeyboardButton = require('./KeyboardButton');

var _KeyboardButton2 = _interopRequireDefault(_KeyboardButton);

var _LatinLayout = require('./layouts/LatinLayout');

var _LatinLayout2 = _interopRequireDefault(_LatinLayout);

var _CyrillicLayout = require('./layouts/CyrillicLayout');

var _CyrillicLayout2 = _interopRequireDefault(_CyrillicLayout);

var _SymbolsLayout = require('./layouts/SymbolsLayout');

var _SymbolsLayout2 = _interopRequireDefault(_SymbolsLayout);

var _GermanLayout = require('./layouts/GermanLayout');

var _GermanLayout2 = _interopRequireDefault(_GermanLayout);

var _BackspaceIcon = require('./icons/BackspaceIcon');

var _BackspaceIcon2 = _interopRequireDefault(_BackspaceIcon);

var _LanguageIcon = require('./icons/LanguageIcon');

var _LanguageIcon2 = _interopRequireDefault(_LanguageIcon);

var _ShiftIcon = require('./icons/ShiftIcon');

var _ShiftIcon2 = _interopRequireDefault(_ShiftIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Keyboard = function (_PureComponent) {
	_inherits(Keyboard, _PureComponent);

	function Keyboard(props) {
		_classCallCheck(this, Keyboard);

		var _this = _possibleConstructorReturn(this, (Keyboard.__proto__ || Object.getPrototypeOf(Keyboard)).call(this, props));

		_this.handleLetterButtonClick = _this.handleLetterButtonClick.bind(_this);
		_this.handleBackspaceClick = _this.handleBackspaceClick.bind(_this);
		_this.handleLanguageClick = _this.handleLanguageClick.bind(_this);
		_this.clearInput = _this.clearInput.bind(_this);
		_this.handleShiftClick = _this.handleShiftClick.bind(_this);
		_this.handleSymbolsClick = _this.handleSymbolsClick.bind(_this);

		_this.state = {
			currentLanguage: props.defaultKeyboard,
			showSymbols: false,
			uppercase: _this.isUppercase()
		};
		return _this;
	}

	_createClass(Keyboard, [{
		key: 'handleLanguageClick',
		value: function handleLanguageClick() {
			this.setState({ currentLanguage: this.state.currentLanguage === this.props.defaultKeyboard ? this.props.secondaryKeyboard : this.props.defaultKeyboard });
		}
	}, {
		key: 'clearInput',
		value: function clearInput() {
			var inputNode = this.props.inputNode;


			inputNode.value = '';
			if (this.props.onClick) {
				this.props.onClick('');
			}

			setTimeout(function () {
				inputNode.focus();
			}, 0);
			inputNode.dispatchEvent(new Event('input'));
		}
	}, {
		key: 'handleShiftClick',
		value: function handleShiftClick() {
			this.setState({ uppercase: !this.state.uppercase });
		}
	}, {
		key: 'handleSymbolsClick',
		value: function handleSymbolsClick() {
			this.setState({ showSymbols: !this.state.showSymbols });
		}
	}, {
		key: 'handleLetterButtonClick',
		value: function handleLetterButtonClick(key) {
			var inputNode = this.props.inputNode;
			var value = inputNode.value;

			var selectionStart = void 0;
			var selectionEnd = void 0;
			try {
				selectionStart = inputNode.selectionStart;
				selectionEnd = inputNode.selectionEnd;
			} catch (e) {
				selectionStart = value.length;
				selectionEnd = value.length;
			}
			var nextValue = value.substring(0, selectionStart) + key + value.substring(selectionEnd);

			inputNode.value = nextValue;
			if (this.props.onClick) {
				this.props.onClick(nextValue);
			}
			setTimeout(function () {
				inputNode.focus();
				try {
					inputNode.setSelectionRange(selectionStart + 1, selectionStart + 1);
				} catch (e) {}
			}, 0);
			this.setState({ uppercase: this.isUppercase() });
			inputNode.dispatchEvent(new Event('input'));
		}
	}, {
		key: 'isUppercase',
		value: function isUppercase() {
			var _props = this.props,
			    inputNode = _props.inputNode,
			    isFirstLetterUppercase = _props.isFirstLetterUppercase;

			return inputNode.type !== 'password' && inputNode.dataset.type !== 'email' && !inputNode.value.length && isFirstLetterUppercase;
		}
	}, {
		key: 'handleBackspaceClick',
		value: function handleBackspaceClick() {
			var inputNode = this.props.inputNode;
			var value = inputNode.value;

			var selectionStart = void 0;
			var selectionEnd = void 0;
			try {
				selectionStart = inputNode.selectionStart;
				selectionEnd = inputNode.selectionEnd;
			} catch (e) {
				selectionStart = 0;
				selectionEnd = value.length;
			}

			var nextValue = void 0;
			var nextSelectionPosition = void 0;
			if (selectionStart === selectionEnd) {
				nextValue = value.substring(0, selectionStart - 1) + value.substring(selectionEnd);
				nextSelectionPosition = selectionStart - 1;
			} else {
				nextValue = value.substring(0, selectionStart) + value.substring(selectionEnd);
				nextSelectionPosition = selectionStart;
			}
			nextSelectionPosition = nextSelectionPosition > 0 ? nextSelectionPosition : 0;

			inputNode.value = nextValue;
			if (this.props.onClick) {
				this.props.onClick(nextValue);
			}
			setTimeout(function () {
				inputNode.focus();
				try {
					inputNode.setSelectionRange(nextSelectionPosition, nextSelectionPosition);
				} catch (e) {}
			}, 0);
			this.setState({ uppercase: this.isUppercase() });
			inputNode.dispatchEvent(new Event('input'));
		}
	}, {
		key: 'getKeys',
		value: function getKeys() {
			var keysSet = void 0;
			if (this.state.showSymbols) {
				keysSet = _SymbolsLayout2.default;
			} else if (this.state.currentLanguage === 'us') {
				keysSet = _LatinLayout2.default;
			} else if (this.state.currentLanguage === 'de') {
				keysSet = _GermanLayout2.default;
			} else if (this.state.currentLanguage === 'ru') {
				keysSet = _CyrillicLayout2.default;
			} else {
				keysSet = _LatinLayout2.default;
			}

			return this.state.uppercase ? keysSet.map(function (keyRow) {
				return keyRow.map(function (key) {
					return key.toUpperCase();
				});
			}) : keysSet;
		}
	}, {
		key: 'getSymbolsKeyValue',
		value: function getSymbolsKeyValue() {
			var symbolsKeyValue = void 0;
			if (!this.state.showSymbols) {
				symbolsKeyValue = '.?!&';
			} else if (this.state.currentLanguage === 'us' || this.state.currentLanguage === 'de') {
				symbolsKeyValue = 'Abc';
			} else if (this.state.currentLanguage === 'ru') {
				symbolsKeyValue = 'Абв';
			} else {
				symbolsKeyValue = 'Abc';
			}
			return symbolsKeyValue;
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var _props2 = this.props,
			    rightButtons = _props2.rightButtons,
			    inputNode = _props2.inputNode,
			    secondaryKeyboard = _props2.secondaryKeyboard;

			var keys = this.getKeys();
			var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
			var symbolsKeyValue = this.getSymbolsKeyValue();

			return _react2.default.createElement(
				'div',
				{ className: 'keyboard keyboard-wrapper' },
				this.props.showPreview && _react2.default.createElement(
					'div',
					{ className: 'keyboard-row keyboard-preview' },
					_react2.default.createElement('input', { value: this.props.value })
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					numbers.map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this2.handleLetterButtonClick,
							classes: "keyboard-numberButton",
							key: button
						});
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						value: _react2.default.createElement(_BackspaceIcon2.default, null),
						onClick: this.handleBackspaceClick
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					keys[0].map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this2.handleLetterButtonClick,
							key: button
						});
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					keys[1].map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this2.handleLetterButtonClick,
							key: button
						});
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					_react2.default.createElement(_KeyboardButton2.default, {
						classes: 'shift-symbols',
						value: _react2.default.createElement(_ShiftIcon2.default, null),
						onClick: this.handleShiftClick
					}),
					keys[2].map(function (button) {
						return _react2.default.createElement(_KeyboardButton2.default, {
							value: button,
							onClick: _this2.handleLetterButtonClick,
							key: button
						});
					}),
					_react2.default.createElement(_KeyboardButton2.default, {
						classes: 'shift-symbols',
						value: symbolsKeyValue,
						onClick: this.handleSymbolsClick
					})
				),
				_react2.default.createElement(
					'div',
					{ className: 'keyboard-row' },
					typeof secondaryKeyboard !== 'undefined' ? _react2.default.createElement(_KeyboardButton2.default, {
						value: _react2.default.createElement(_LanguageIcon2.default, null),
						onClick: this.handleLanguageClick
					}) : null,
					inputNode.dataset.type === 'email' ? _react2.default.createElement(_KeyboardButton2.default, {
						value: '@',
						onClick: this.handleLetterButtonClick
					}) : null,
					_react2.default.createElement(_KeyboardButton2.default, {
						value: ' ',
						classes: 'keyboard-space',
						onClick: this.handleLetterButtonClick
					}),
					inputNode.dataset.type === 'email' ? _react2.default.createElement(_KeyboardButton2.default, {
						value: '.',
						onClick: this.handleLetterButtonClick
					}) : null,
					_react2.default.createElement(_KeyboardButton2.default, {
						value: '↧',
						classes: 'keyboard-submit-button',
						onClick: this.props.hideKeyboard
					})
				)
			);
		}
	}]);

	return Keyboard;
}(_react.PureComponent);

Keyboard.propTypes = {
	inputNode: _react.PropTypes.any.isRequired,
	onClick: _react.PropTypes.func,
	isFirstLetterUppercase: _react.PropTypes.bool,
	defaultKeyboard: _react.PropTypes.string,
	secondaryKeyboard: _react.PropTypes.string,
	hideKeyboard: _react.PropTypes.func,
	showPreview: _react.PropTypes.bool,
	value: _react.PropTypes.string
};
Keyboard.defaultProps = {
	rightButtons: [],
	isFirstLetterUppercase: false,
	defaultKeyboard: 'us',
	value: ""
};
exports.default = Keyboard;
//# sourceMappingURL=Keyboard.js.map