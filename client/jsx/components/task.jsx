import React from 'react';

const Task = React.createClass({

  viewImportance () {
    const taskImportance = {
      normalImp: 'Обычная задача',
      importantImp: 'Важная задача',
      veryImportantImp: 'Очень важная задача'
    };

    return taskImportance[this.props.importance];
  },

  viewTaskComplete () {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };

    return (
      this.props.taskComplete
        ? `Задача выполнена ${new Date(this.props.endTime).toLocaleString('ru', options)}`
        : `Задача на исполнении${
          this.props.finishTime
            ? ' до ' + new Date(this.props.finishTime).toLocaleString('ru', options)
            : ''
        }`
    );
  },

  setColorTask () {
    return (
      this.props.finishTime
        ? (new Date(this.props.finishTime).valueOf() - Date.now() < 0) ? {backgroundColor: 'red'} : null
        : null
    );
  },

  render () {
    return (
      <div className='card' style={this.setColorTask()}>
        <div className='card-block'>
          {this.props.title ? <h3 className='card-title'>{this.props.title}</h3> : null}
          <div className='card-text'>{this.props.children}</div>
          <div className='card-text'>{this.viewImportance()}</div>
          <div className='card-text'>{this.viewTaskComplete()}</div>
          <button className='btn btn-primary' onClick={this.props.onEdit}>
            Edit Task
          </button>
          <button className='btn btn-warning' onClick={this.props.onDelete}>
            Delete Task
          </button>
        </div>
      </div>
    );
  }
});

export default Task;
