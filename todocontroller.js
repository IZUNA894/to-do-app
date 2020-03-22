//this is main controller file...
var bodyParser = require("body-parser");
require("./db/mongodb");
var Todo = require("./db/task_module.js");

var data =[];
var urlencodedParser = bodyParser.urlencoded({extended : false});



module.exports= function(app)
{

  //simple get request...
  app.get('/',function(req,res){
    res.send("hello from server side..")
  });

  //getting all tasks
  app.get('/todo',async function(req,res){ 
        var todos = await Todo.find({});
        
        console.log(todos);

        res.render('todo',{todos});
    }
  )

 //creating a task..
 app.post('/todo',urlencodedParser, async function(req,res){
   

    var todoObj = { todo : req.body.item };
    var todo = new Todo(todoObj);
    report = await todo.save();
    console.log("task created as",report );
    res.send("h");
  });


  //deleting a task...
  app.delete('/todo/:item',async function(req,res){

    

      var todoObj = { todo : req.params.item.replace(/\-/g , ' ') };
      var report = await Todo.deleteOne(todoObj);
      console.log(report);
      res.status(200).send("deleted");
  });



  
}
