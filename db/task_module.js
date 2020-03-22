const mongoose = require('mongoose')

var todoSchema=new mongoose.Schema({
  todo:
  {
    required:true,
    type:String,
    trim:true

  }
  

}
);
var Task= mongoose.model('Todo' , todoSchema);
module.exports = Task;
