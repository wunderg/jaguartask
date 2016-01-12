var Task = require('./taskModel.js');
var User = require('../users/userModel.js');
var List = require('../taskList/taskListModel.js');


module.exports = {

  get: function(req, res, next){

  },

  save: function(req, res, next){

    var task = new Task({
      user: req.body.username,
      title: req.body.title,
      // notes: req.body.notes,
      done: req.body.done,
      // lists: req.body.listId
      // dueDate: req.body.dueDate,
      // priority: req.body.priority
      // list: id
    })
      .save()
      .then(function(task) {
        return List
          .findOne({title: req.body.listTitle})
          .exec()
          .then(function(list) {
            return [task, list];
         });
      })
      .then(function(result) {
        if(!result[1]) {
          return new List({title: req.body.listTitle})
            .save()
            .then(function(list) {
              result[1] = list;
              return result;
            })
            .then(null, function(err) {
              console.log(err);
            })
        } else {
         return result;
        }
      })
      .then(function(result) {
        var taskId = result[0]._id;
        result[1].tasks.push(taskId);
        result[1].save();
        return result;
      })
      .then(function(result) {
        res.json(result);
      })
      .then(null, function(err) {
        console.log(err);
      })
    },

  delete: function(req, res, next){

  },

};
