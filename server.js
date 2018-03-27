// require express and other modules
var express = require('express');
var  app = express();
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { 
    _id: 7, 
    task: 'Laundry', 
    description: 'Wash clothes' 
  },
  { 
    _id: 27, 
    task: 'Grocery Shopping', 
    description: 'Buy dinner for this week' 
  },
  { 
    _id: 44, 
    task: 'Homework', 
    description: 'Make this app super awesome!' 
  }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {

  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

 /* This endpoint responds with all of the todos
  */
app.get('/api/todos', function index(req, res) {
   res.json(todos)
});


  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   Broken,HELP*/
app.post('/api/todos', function create(req, res) {
    var newTodo = req.body;
    var newTask = {_id:21, task:"Clean Kitchen", description:"Run dishwasher."};
    
    if (todos.length > 0){
      newTodo._id = todos[todos.length - 1]._id + 1;
      todos.push(newTask); 
    } else {
        newTodo._id = 1; 
    }  

    todos.push(newTodo); 
   res.json(accessTodos);
});


  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */
app.get('/api/todos/:id', function show(req, res) {
   var urlId = parseInt(req.params.id);
   var selectedToDo = todos.filter(function (taskObj){
    return taskObj._id == urlId;
   })
   console.log(selectedToDo);
   res.json(selectedToDo);
});


  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   HELP*/
app.put('/api/todos/:id', function update(req, res) {
  var urlId = parseInt(req.params.id);
  var selectedToDoToUpdate = todos.filter(function (taskObj){
    if(taskObj._id == urlId){
      //update?
    }
  })
  res.json(selectedToDoToUpdate);
});


  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */
app.delete('/api/todos/:id', function destroy(req, res) {
  var urlId = parseInt(req.params.id);
  var selectedToDoToDelete = todos.filter(function (taskObj){
    if(taskObj._id == urlId){
      return taskObj;
    }
      todos.pop(selectedToDoToDelete);
  })
  res.send('successful DELETE request');
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
