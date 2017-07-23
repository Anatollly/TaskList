const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: {type: String},
  text: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  taskComplete: {type: Boolean},
  edit: {type: Boolean, default: false},
  importance: {type: String, default: 'normalImp'},
  finishTime: {type: Date},
  endTime: {type: Date}
});

const Task = mongoose.model('Task', TaskSchema);

const setUpConnection = () => {
  mongoose.connect('mongodb://localhost:27017/tasks');
};

const taskList = () => {
  return Task.find();
};

const createTask = (data) => {
  const task = new Task({
    title: data.title,
    text: data.text,
    taskComplete: data.taskComplete,
    createdAt: new Date(),
    edit: data.edit,
    importance: data.importance,
    finishTime: data.finishTime,
    endTime: data.endTime
  });

  return task.save();
};

const deleteTask = (id) => {
  return Task.findById(id).remove();
};

const updateTask = (dataId, data) => {
  Task.findByIdAndUpdate(dataId,
      {$set: {
        text: data.text,
        title: data.title,
        taskComplete: data.taskComplete,
        importance: data.importance,
        finishTime: data.finishTime,
        endTime: data.endTime
      }},
      (err, doc) => {
        if (err) {
          console.log(err);
        }
        console.log(doc);
      });
};

module.exports = {
  setUpConnection,
  taskList,
  createTask,
  deleteTask,
  updateTask
};
