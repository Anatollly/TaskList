import {EventEmitter} from 'events';
import dateFormat from 'dateformat';

import Dispatcher from '../dispatchers/dispatcher';
import Constants from '../constants/constants';

const EVENT_CHANGE = 'change';
const EVENT_EDIT = 'edit';

let _tasks = [];
let _loadingError = null;
let _isLoading = true;
let _editTask = {};

const formatTask = (task) => {
  if (task.finishTime) {
    let taskTime = new Date(task.finishTime).toISOString();
    task.finishTime = taskTime.replace(/Z$/, '');
  }
  if (task.endTime) {
    task.endTime = dateFormat(task.endTime, 'isoDateTime');
  }
  return {
    id: task._id,
    title: task.title,
    text: task.text,
    taskComplete: task.taskComplete,
    createdAt: task.createdAt,
    importance: task.importance,
    finishTime: task.finishTime,
    endTime: task.endTime
  };
};

const TasksStore = Object.assign({}, EventEmitter.prototype, {
  isLoading() {
    return _isLoading;
  },

  getTasks() {
    return _tasks;
  },

  getEditTask() {
    return _editTask;
  },

  emitChange() {
    this.emit(EVENT_CHANGE);
  },

  emitEdit() {
    this.emit(EVENT_EDIT);
  },

  addChangeListener(cb) {
    this.on(EVENT_CHANGE, cb);
  },

  addEditListener(cb) {
    this.on(EVENT_EDIT, cb);
  },

  removeChangeListener(callback) {
    this.removeListener(EVENT_CHANGE, callback);
  }
});

Dispatcher.register(function (action) {
  switch (action.type) {
    case Constants.LOAD_TASKS_REQUEST: {
      _isLoading = true;
      TasksStore.emitChange();
      break;
    }

    case Constants.LOAD_TASKS_SUCCESS: {
      _isLoading = false;
      _tasks = action.tasks.map(formatTask);
      _loadingError = null;
      TasksStore.emitChange();
      break;
    }

    case Constants.LOAD_TASKS_FAIL: {
      _loadingError = action.error;
      TasksStore.emitChange();
      break;
    }

    case Constants.EDIT_TASK: {
      _editTask = action.editTask;
      TasksStore.emitEdit();
      break;
    }

    default: {
      console.log('No such handler');
    }
  }
});

export default TasksStore;
