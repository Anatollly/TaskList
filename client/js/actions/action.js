import Dispatcher from '../dispatchers/dispatcher';
import Constants from '../constants/constants';

import api from '../api/api';

let currentFilter = 'all';

const Action = {

  loadTasks(filter) {
    currentFilter = filter;
    Dispatcher.dispatch({
      type: Constants.LOAD_TASKS_REQUEST
    });

    api.taskList(filter)
        .then(({data}) => {
          Dispatcher.dispatch({
            type: Constants.LOAD_TASKS_SUCCESS,
            tasks: data
          });
        })
        .catch((err) => {
          Dispatcher.dispatch({
            type: Constants.LOAD_TASKS_FAIL,
            error: err
          });
        });
  },

  createTask(task) {
    api.createTask(task)
        .then(() => {
          this.loadTasks(currentFilter);
        })
        .catch((err) => {
          console.log(err);
        });
  },

  updateTask(taskId, task) {
    api.updateTask(taskId, task)
        .then(() => {
          this.loadTasks(currentFilter);
        })
        .catch((err) => {
          console.log(err);
        });
  },

  deleteTask(taskId) {
    api.deleteTask(taskId)
        .then(() => {
          this.loadTasks(currentFilter);
        })
        .catch((err) => {
          console.log(err);
        });
  },

  editTask(task) {
    Dispatcher.dispatch({
      type: Constants.EDIT_TASK,
      editTask: task
    });
  }
};

export default Action;
