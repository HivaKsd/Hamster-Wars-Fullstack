const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require(path.join(__dirname, 'routes/hamsters.js'))

const PORT = process.env.PORT || 1338
const buildFolder = path.join(__dirname, '../build')

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.params);
  next()
})

app.use(express.json())
app.use(cors())
app.use(express.static(buildFolder))

//Routes
app.use('/hamsters', hamsters)

app.get('/', (req, res) => {
  res.send('Hello from server')
})


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})


app.use(erroeHandler)
function erroeHandler (err, req, res, next) {
  console.log('ERROR!');

  if (res.headersSent) {
    return next(err)
  }

  res.status(500)
  res.send({message: 'error', error: err})
}

// Starta servern
app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})
