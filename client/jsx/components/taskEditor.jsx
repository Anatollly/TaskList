import React from 'react';
import createReactClass from 'create-react-class';
import Store from '../stores/store';

const getEditTaskFromDispatcher = () => {
  return Store.getEditTask();
};

var TaskEditor = createReactClass({
  getInitialState () {
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

  handleTitleChange (event) {
    this.setState({ title: event.target.value });
  },

  handleTextChange (event) {
    this.setState({ text: event.target.value });
  },

  componentDidMount () {
    Store.addEditListener(this._onEditTaskChange);
  },

  _onEditTaskChange () {
    this.setState(getEditTaskFromDispatcher());
  },

  handleTaskCancel () {
    this.setState(this.getInitialState());
  },

  handleTaskComplete (event) {
    this.setState({taskComplete: event.target.checked});
  },

  handleTaskImportance (event) {
    this.setState({importance: event.target.value});
  },

  handleDateTime (event) {
    this.setState({finishTime: event.target.value});
  },

  handleTaskAdd () {
    const newTask = {
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

  render: function () {
    return (
      <div className='form-group'>
        <input className='form-control'
          type='text'
          placeholder='Enter title'
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <textarea className='form-control'
          placeholder='Enter text'
          rows={6}
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <fieldset className='form-group'>
          <legend>Важность задачи: </legend>
          <div className='form-check'>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='radio'
                name='importance'
                value='normalImp'
                checked={this.state.importance === 'normalImp'}
                onChange={this.handleTaskImportance}
              />Обычная задача
            </label>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='radio'
                name='importance'
                value='importantImp'
                checked={this.state.importance === 'importantImp'}
                onChange={this.handleTaskImportance}
              />Важная задача
            </label>
            <label className='form-check-label'>
              <input
                className='form-check-input'
                type='radio'
                name='importance'
                value='veryImportantImp'
                checked={this.state.importance === 'veryImportantImp'}
                onChange={this.handleTaskImportance}
              />Очень важная задача
            </label>
          </div>
        </fieldset>
        <label className='form-control'> Задачу нужно выполнить до:
          <input
            type='datetime-local'
            name='datetime'
            value={this.state.finishTime}
            onChange={this.handleDateTime}
          />
        </label>
        <label className='form-control'> Пометить как выполненную
          <input
            type='checkbox'
            checked={this.state.taskComplete}
            onChange={this.handleTaskComplete}
          />
        </label>
        <button className='btn btn-primary'
          disabled={!this.state.text}
          onClick={this.handleTaskAdd}
        >
          Ok
        </button>
        <button className='btn btn-warning'
          disabled={!this.state.text && !this.state.title}
          onClick={this.handleTaskCancel}
        >
          Cancel
        </button>
      </div>
    );
  }
});

export default TaskEditor;
