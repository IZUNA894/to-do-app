//this is main controller file...
var bodyParser = require("body-parser");
var data =[{ item : 'buy 2kg of onion' }, {item : "read the da vinci code"} , { item : " do the html revision"}];
var urlencodedParser = bodyParser.urlencoded({extended : false});

const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "replace this with your dtabase conneting string with your username and password...";

module.exports= function(app)
{
//decides what happens on get req...
  app.get('/todo',function(req,res){
    MongoClient.connect(uri,{useNewUrlParser:true} , function(err, client) {
       if(err) {
            console.log('Error 566 occurred while connecting to MongoDB Atlas...\n',err);
       }
       console.log('Connected...');
       const collection = client.db("todo").collection("toDoList");

      collection.find({}).toArray( function(err, data) {
        if (err) throw err;
        console.log("data retrieved");
          res.render('todo' , { todo : data});
       client.close();
    });
    });


  }
  )
  // decide what happens on post req...
  app.post('/todo',urlencodedParser, function(req,res){
    data.push(req.body);
     MongoClient.connect(uri,{useNewUrlParser:true} , function(err, client) {
       if(err) {
            console.log('Error 566 occurred while connecting to MongoDB Atlas...\n',err);
       }
       console.log('Connected...');
       const collection = client.db("todo").collection("toDoList");

       var myobj = { item : req.body.item };
      collection.insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        console.log(req.body.item);
       client.close();
    });
    });

    res.json("jj");

  }
)
// decides what happens on an delte req
  app.delete('/todo/:item',function(req,res){

      MongoClient.connect(uri , {useNewUrlParser:true} , function(err, client) {
       if (err) throw err;
       console.log("connected");

        var myquery = { item : req.params.item.replace(/\-/g , ' ') };
         const collection = client.db("todo").collection("toDoList");
         collection.deleteOne(myquery, function(err, obj) {
          if (err) throw err;
          console.log("1 document deleted");
          console.log(req.params.item.replace(/\-/g , ' '));
           client.close();
           res.json("w");
});
});


  }
  )
}
