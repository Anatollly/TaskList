import React from 'react';

import Task from './task';

const TaskList = React.createClass({

  getInitialState () {
    return {
      filter: 'allImp'
    };
  },

  handleFilterTask (event) {
    this.setState({filter: event.target.value}, () => {
      this.props.onFilterTask(this.state.filter);
    });
  },

  render  () {
    return (
      <div>
        <div className='form-group'>
          <legend>Фильтр: </legend>
          <label className='form-check-label'>
            <input className='form-check-input'
              type='radio'
              name='filter'
              value='allImp'
              checked={this.state.filter === 'allImp'}
              onChange={this.handleFilterTask}
            />Все задачи
          </label>
          <label className='form-check-label'>
            <input className='form-check-input'
              type='radio'
              name='filter'
              value='normalImp'
              checked={this.state.filter === 'normalImp'}
              onChange={this.handleFilterTask}
            />Обычные задачи
          </label>
          <label className='form-check-label'>
            <input className='form-check-input'
              type='radio'
              name='filter'
              value='importantImp'
              checked={this.state.filter === 'importantImp'}
              onChange={this.handleFilterTask}
            />Важные задачи
          </label>
          <label className='form-check-label'>
            <input className='form-check-input'
              type='radio'
              name='filter'
              value='veryImportantImp'
              checked={this.state.filter === 'veryImportantImp'}
              onChange={this.handleFilterTask}
            />Очень важные задачи
          </label>
        </div>
        {
          this.props.tasks.map((task) => {
            return (
              <Task
                key={task.id}
                title={task.title}
                importance={task.importance}
                taskComplete={task.taskComplete}
                finishTime={task.finishTime}
                endTime={task.endTime}
                onDelete={this.props.onTaskDelete.bind(null, task)}
                onEdit={this.props.onTaskEdit.bind(null, task)}
              >
                {task.text}
              </Task>
            );
          })
        }
      </div>
    );
  }
});

export default TaskList;
