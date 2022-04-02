const express = require('express')
const common = require('./task/common')
const app = express()
const port = 1001

const controller1 = require('./task/controller1') //task 1 implementation
const controller2 = require('./task/controller2') //task 2 implementation
const controller3 = require('./task/controller3') //task 3 implementation

//debug
common.setDebug(false) //set true for console debug outputs

app.get('/I/want/title', (req, resp) => {
	//resp.send('Hello World from Ali Adnan')
	controller3.iWantTitleController(req, resp)
})

app.all('/*', (req, resp) => {
  resp.sendStatus(404);
})



app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})