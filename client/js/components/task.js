'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Task = _react2.default.createClass({
  viewImportance: function viewImportance() {
    var taskImportance = {
      normalImp: 'Обычная задача',
      importantImp: 'Важная задача',
      veryImportantImp: 'Очень важная задача'
    };

    return taskImportance[this.props.importance];
  },
  viewTaskComplete: function viewTaskComplete() {
    var options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    return this.props.taskComplete ? '\u0417\u0430\u0434\u0430\u0447\u0430 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430 ' + new Date(this.props.endTime).toLocaleString('ru', options) : '\u0417\u0430\u0434\u0430\u0447\u0430 \u043D\u0430 \u0438\u0441\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0438' + (this.props.finishTime ? ' до ' + new Date(this.props.finishTime).toLocaleString('ru', options) : '');
  },
  setColorTask: function setColorTask() {
    return this.props.finishTime ? new Date(this.props.finishTime).valueOf() - Date.now() < 0 ? { backgroundColor: 'red' } : null : null;
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'card', style: this.setColorTask() },
      _react2.default.createElement(
        'div',
        { className: 'card-block' },
        this.props.title ? _react2.default.createElement(
          'h3',
          { className: 'card-title' },
          this.props.title
        ) : null,
        _react2.default.createElement(
          'div',
          { className: 'card-text' },
          this.props.children
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-text' },
          this.viewImportance()
        ),
        _react2.default.createElement(
          'div',
          { className: 'card-text' },
          this.viewTaskComplete()
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: this.props.onEdit },
          'Edit Task'
        ),
        _react2.default.createElement(
          'button',
          { className: 'btn btn-warning', onClick: this.props.onDelete },
          'Delete Task'
        )
      )
    );
  }
});

exports.default = Task;