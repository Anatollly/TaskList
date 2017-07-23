'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _store = require('../stores/store');

var _store2 = _interopRequireDefault(_store);

var _action = require('../actions/action');

var _action2 = _interopRequireDefault(_action);

var _taskEditor = require('./taskEditor');

var _taskEditor2 = _interopRequireDefault(_taskEditor);

var _taskList = require('./taskList');

var _taskList2 = _interopRequireDefault(_taskList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INIT_FILTER = 'allImp';

var getStateFromDispatcher = function getStateFromDispatcher() {
  return {
    isLoading: _store2.default.isLoading(),
    tasks: _store2.default.getTasks()
  };
};

var App = (0, _createReactClass2.default)({
  getInitialState: function getInitialState() {
    return getStateFromDispatcher();
  },
  componentWillMount: function componentWillMount() {
    _action2.default.loadTasks(INIT_FILTER);
  },
  componentDidMount: function componentDidMount() {
    _store2.default.addChangeListener(this._onChange);
  },
  componentWillUnmount: function componentWillUnmount() {
    _store2.default.removeChangeListener(this._onChange);
  },
  handleTaskDelete: function handleTaskDelete(task) {
    _action2.default.deleteTask(task.id);
  },
  handleTaskAdd: function handleTaskAdd(task) {
    if (task.edit) {
      _action2.default.updateTask(task.id, task);
    } else {
      _action2.default.createTask(task);
    }
  },
  handleFilter: function handleFilter(filter) {
    _action2.default.loadTasks(filter);
  },
  handleTaskEdit: function handleTaskEdit(task) {
    task.edit = true;
    _action2.default.editTask(task);
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h2',
        null,
        'Task List'
      ),
      _react2.default.createElement(_taskEditor2.default, { onTaskAdd: this.handleTaskAdd }),
      _react2.default.createElement(_taskList2.default, {
        onFilterTask: this.handleFilter,
        tasks: this.state.tasks,
        onTaskDelete: this.handleTaskDelete,
        onTaskEdit: this.handleTaskEdit
      })
    );
  },
  _onChange: function _onChange() {
    this.setState(getStateFromDispatcher());
  }
});

exports.default = App;