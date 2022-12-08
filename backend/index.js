const express = require('express')
const app = express()
const port = 3005
const bodyParser = require('body-parser')
const cors = require('cors');
const uploadRouter = require('./routes/uploadRouter.js');

var corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: false
}))
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/upload', uploadRouter);

app.listen(port, () => {
  console.log(`Server is running - port : ${port}`)
})