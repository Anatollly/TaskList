import React from 'react';
import createReactClass from 'create-react-class';

import Store from '../stores/store';
import Action from '../actions/action';

import TaskEditor from './taskEditor';
import TaskList from './taskList';

const INIT_FILTER = 'allImp';

const getStateFromDispatcher = () => {
  return {
    isLoading: Store.isLoading(),
    tasks: Store.getTasks()
  };
};

const App = createReactClass({

  getInitialState () {
    return getStateFromDispatcher();
  },

  componentWillMount () {
    Action.loadTasks(INIT_FILTER);
  },

  componentDidMount () {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount () {
    Store.removeChangeListener(this._onChange);
  },

  handleTaskDelete  (task) {
    Action.deleteTask(task.id);
  },

  handleTaskAdd (task) {
    if (task.edit) {
      Action.updateTask(task.id, task);
    } else {
      Action.createTask(task);
    }
  },

  handleFilter (filter) {
    Action.loadTasks(filter);
  },

  handleTaskEdit (task) {
    task.edit = true;
    Action.editTask(task);
  },

  render () {
    return (
      <div>
        <h2>Task List</h2>
        <TaskEditor onTaskAdd={this.handleTaskAdd} />
        <TaskList
          onFilterTask={this.handleFilter}
          tasks={this.state.tasks}
          onTaskDelete={this.handleTaskDelete}
          onTaskEdit={this.handleTaskEdit}
        />
      </div>
    );
  },

  _onChange () {
    this.setState(getStateFromDispatcher());
  }

});

export default App;
