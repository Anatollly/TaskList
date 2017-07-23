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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getEditTaskFromDispatcher = function getEditTaskFromDispatcher() {
  return _store2.default.getEditTask();
};

var TaskEditor = (0, _createReactClass2.default)({
  getInitialState: function getInitialState() {
    return {
      createAt: '',
      id: '',
      title: '',
      text: '',
      taskComplete: false,
      edit: false,
      importance: 'normalImp',
      finishTime: '',
      endTime: ''
    };
  },
  handleTitleChange: function handleTitleChange(event) {
    this.setState({ title: event.target.value });
  },
  handleTextChange: function handleTextChange(event) {
    this.setState({ text: event.target.value });
  },
  componentDidMount: function componentDidMount() {
    _store2.default.addEditListener(this._onEditTaskChange);
  },
  _onEditTaskChange: function _onEditTaskChange() {
    this.setState(getEditTaskFromDispatcher());
  },
  handleTaskCancel: function handleTaskCancel() {
    this.setState(this.getInitialState());
  },
  handleTaskComplete: function handleTaskComplete(event) {
    this.setState({ taskComplete: event.target.checked });
  },
  handleTaskImportance: function handleTaskImportance(event) {
    this.setState({ importance: event.target.value });
  },
  handleDateTime: function handleDateTime(event) {
    this.setState({ finishTime: event.target.value });
  },
  handleTaskAdd: function handleTaskAdd() {
    var newTask = {
      createAt: this.state.createAt,
      id: this.state.id,
      title: this.state.title,
      text: this.state.text,
      taskComplete: this.state.taskComplete,
      edit: this.state.edit,
      importance: this.state.importance,
      finishTime: this.state.taskComplete ? '' : this.state.finishTime,
      endTime: this.state.taskComplete ? new Date(Date.now()) : ''
    };
    this.props.onTaskAdd(newTask);
    this.handleTaskCancel();
  },


  render: function render() {
    return _react2.default.createElement(
      'div',
      { className: 'form-group' },
      _react2.default.createElement('input', { className: 'form-control',
        type: 'text',
        placeholder: 'Enter title',
        value: this.state.title,
        onChange: this.handleTitleChange
      }),
      _react2.default.createElement('textarea', { className: 'form-control',
        placeholder: 'Enter text',
        rows: 6,
        value: this.state.text,
        onChange: this.handleTextChange
      }),
      _react2.default.createElement(
        'fieldset',
        { className: 'form-group' },
        _react2.default.createElement(
          'legend',
          null,
          '\u0412\u0430\u0436\u043D\u043E\u0441\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0438: '
        ),
        _react2.default.createElement(
          'div',
          { className: 'form-check' },
          _react2.default.createElement(
            'label',
            { className: 'form-check-label' },
            _react2.default.createElement('input', {
              className: 'form-check-input',
              type: 'radio',
              name: 'importance',
              value: 'normalImp',
              checked: this.state.importance === 'normalImp',
              onChange: this.handleTaskImportance
            }),
            '\u041E\u0431\u044B\u0447\u043D\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430'
          ),
          _react2.default.createElement(
            'label',
            { className: 'form-check-label' },
            _react2.default.createElement('input', {
              className: 'form-check-input',
              type: 'radio',
              name: 'importance',
              value: 'importantImp',
              checked: this.state.importance === 'importantImp',
              onChange: this.handleTaskImportance
            }),
            '\u0412\u0430\u0436\u043D\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430'
          ),
          _react2.default.createElement(
            'label',
            { className: 'form-check-label' },
            _react2.default.createElement('input', {
              className: 'form-check-input',
              type: 'radio',
              name: 'importance',
              value: 'veryImportantImp',
              checked: this.state.importance === 'veryImportantImp',
              onChange: this.handleTaskImportance
            }),
            '\u041E\u0447\u0435\u043D\u044C \u0432\u0430\u0436\u043D\u0430\u044F \u0437\u0430\u0434\u0430\u0447\u0430'
          )
        )
      ),
      _react2.default.createElement(
        'label',
        { className: 'form-control' },
        ' \u0417\u0430\u0434\u0430\u0447\u0443 \u043D\u0443\u0436\u043D\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C \u0434\u043E:',
        _react2.default.createElement('input', {
          type: 'datetime-local',
          name: 'datetime',
          value: this.state.finishTime,
          onChange: this.handleDateTime
        })
      ),
      _react2.default.createElement(
        'label',
        { className: 'form-control' },
        ' \u041F\u043E\u043C\u0435\u0442\u0438\u0442\u044C \u043A\u0430\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u0443\u044E',
        _react2.default.createElement('input', {
          type: 'checkbox',
          checked: this.state.taskComplete,
          onChange: this.handleTaskComplete
        })
      ),
      _react2.default.createElement(
        'button',
        { className: 'btn btn-primary',
          disabled: !this.state.text,
          onClick: this.handleTaskAdd
        },
        'Ok'
      ),
      _react2.default.createElement(
        'button',
        { className: 'btn btn-warning',
          disabled: !this.state.text && !this.state.title,
          onClick: this.handleTaskCancel
        },
        'Cancel'
      )
    );
  }
});

exports.default = TaskEditor;