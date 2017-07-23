const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const {setUpConnection, taskList, createTask, deleteTask, updateTask} = require('./db/db');

const app = express();

const pathRoot = 'build/client/';

setUpConnection();

app.use(express.static(path.resolve(pathRoot)));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(pathRoot + 'index.html'));
});

app.get('/tasks/:id', (req, res) => {
  taskList()
      .then((data) => {
        let filteredData = {};
        if (req.params.id === 'allImp') {
          filteredData = data;
        } else {
          filteredData = data.filter((task) => {
            if (task.importance === req.params.id) {
              return true;
            } else {
              return false;
            }
          });
        }
        res.send(filteredData);
      });
});

app.post('/tasks', (req, res) => {
  createTask(req.body)
      .then(() => {
        res.send();
      });
});

app.delete('/tasks/:id', (req, res) => {
  deleteTask(req.params.id)
      .then((data) => {
        res.send(data);
      });
});

app.put('/tasks/:id', (req, res) => {
  updateTask(req.params.id, req.body);
  res.send();
});


app.listen(5050, () => {
  console.log('App listening on port 5050!');
});
