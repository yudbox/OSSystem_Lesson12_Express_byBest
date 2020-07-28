const express = require('express')
const app = express()
const port = 5000


let thoughts = [];


app.use(express.json())


  // ------------ CORS policy for 

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});



app.get('/', (req, res) => res.send('This is home page. Please use URL /thoughts'))

    // ------------ this request allows to get all Thoughts

app.get('/thoughts', (req, res) => {
  res.json({
    success: true,
    thoughts: thoughts
  });
})

    // ------------ this request allows to get single Thought

app.get('/thoughts/:thoughtId', (req, res) => {
  const {
    thoughtId
  } = req.params;

  const thought = thoughts.find(thought => thought.id == thoughtId)

  res.json({
    success: true,
    thought: thought,
    params: req.params
  });
})

    // ------------ this request allows to ceate a new Thought

app.post('/thoughts', (req, res) => {
  const body = req.body;
  thoughts = [...thoughts, body]

  res.json({
    success: true,
    thoughts: thoughts,
    params: body
  })

});

// All put request updated only one parametr of Thought (like, favorite or new text)

app.put('/thoughts/liked/:thoughtId', (req, res) => {

  let thoughtParamsID = req.params.thoughtId;
  let body = req.body;

  thoughts = thoughts.map(thought=>{
    if(thought.id == thoughtParamsID) {
      return {...thought,
      liked: body.liked
      }
    } else {
      return thought
    }
  })

  res.json({
    success: true,
    paramsId: thoughtParamsID,
    body: body,
    bodyParams: thoughts
  })

});
app.put('/thoughts/favorite/:thoughtId', (req, res) => {

  let thoughtParamsID = req.params.thoughtId;
  let body = req.body;

  thoughts = thoughts.map(thought=>{
    if(thought.id == thoughtParamsID) {
      return {...thought,
        favorite: body.favorite,
      }
    } else {
      return thought
    }
  })

  res.json({
    success: true,
    paramsId: thoughtParamsID,
    body: body,
    bodyParams: thoughts
  })

});
app.put('/thoughts/text/:thoughtId', (req, res) => {

  let thoughtParamsID = req.params.thoughtId;
  let body = req.body;

  thoughts = thoughts.map(thought=>{
    if(thought.id == thoughtParamsID) {
      return {...thought,
        value: body.text,
        lastEditted: body.lastEditted
      }
    } else {
      return thought
    }
  })

  res.json({
    success: true,
    paramsId: thoughtParamsID,
    body: body,
    bodyParams: thoughts
  })

});

// this request allows to delete the single Thought

app.delete('/thoughts/:thoughtId', (req, res) => {

  let thoughtParamsID = req.params.thoughtId;


  thoughts = thoughts.filter(thought=>thought.id != thoughtParamsID)
  res.json({
    success: true,
    paramThougts: thoughts
  })

});


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))