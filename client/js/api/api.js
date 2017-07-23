import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default {
  taskList(filter) {
    return axios.get(`http://localhost:5050/tasks/${filter}`);
  },

  createTask(data) {
    return axios.post('http://localhost:5050/tasks', data);
  },

  deleteTask(taskId) {
    return axios.delete(`http://localhost:5050/tasks/${taskId}`);
  },

  updateTask(taskId, data) {
    return axios.put(`http://localhost:5050/tasks/${taskId}`, data);
  }
};
