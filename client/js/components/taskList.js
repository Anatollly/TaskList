'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TaskList = _react2.default.createClass({
  getInitialState: function getInitialState() {
    return {
      filter: 'allImp'
    };
  },
  handleFilterTask: function handleFilterTask(event) {
    var _this = this;

    this.setState({ filter: event.target.value }, function () {
      _this.props.onFilterTask(_this.state.filter);
    });
  },
  render: function render() {
    var _this2 = this;

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'form-group' },
        _react2.default.createElement(
          'legend',
          null,
          '\u0424\u0438\u043B\u044C\u0442\u0440: '
        ),
        _react2.default.createElement(
          'label',
          { className: 'form-check-label' },
          _react2.default.createElement('input', { className: 'form-check-input',
            type: 'radio',
            name: 'filter',
            value: 'allImp',
            checked: this.state.filter === 'allImp',
            onChange: this.handleFilterTask
          }),
          '\u0412\u0441\u0435 \u0437\u0430\u0434\u0430\u0447\u0438'
        ),
        _react2.default.createElement(
          'label',
          { className: 'form-check-label' },
          _react2.default.createElement('input', { className: 'form-check-input',
            type: 'radio',
            name: 'filter',
            value: 'normalImp',
            checked: this.state.filter === 'normalImp',
            onChange: this.handleFilterTask
          }),
          '\u041E\u0431\u044B\u0447\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438'
        ),
        _react2.default.createElement(
          'label',
          { className: 'form-check-label' },
          _react2.default.createElement('input', { className: 'form-check-input',
            type: 'radio',
            name: 'filter',
            value: 'importantImp',
            checked: this.state.filter === 'importantImp',
            onChange: this.handleFilterTask
          }),
          '\u0412\u0430\u0436\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438'
        ),
        _react2.default.createElement(
          'label',
          { className: 'form-check-label' },
          _react2.default.createElement('input', { className: 'form-check-input',
            type: 'radio',
            name: 'filter',
            value: 'veryImportantImp',
            checked: this.state.filter === 'veryImportantImp',
            onChange: this.handleFilterTask
          }),
          '\u041E\u0447\u0435\u043D\u044C \u0432\u0430\u0436\u043D\u044B\u0435 \u0437\u0430\u0434\u0430\u0447\u0438'
        )
      ),
      this.props.tasks.map(function (task) {
        return _react2.default.createElement(
          _task2.default,
          {
            key: task.id,
            title: task.title,
            importance: task.importance,
            taskComplete: task.taskComplete,
            finishTime: task.finishTime,
            endTime: task.endTime,
            onDelete: _this2.props.onTaskDelete.bind(null, task),
            onEdit: _this2.props.onTaskEdit.bind(null, task)
          },
          task.text
        );
      })
    );
  }
});

exports.default = TaskList;