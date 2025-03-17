const dotenv = require('dotenv')
const express = require('express')
const apiRouter = require('./routes/apiRouter')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
// Load environment variables
dotenv.config()

const corsOptions = {
  origin: 'http://localhost:5173',
}

app.use(express.static(path.join(__dirname, '../dist')))

if (process.env.ENV === 'dev') {
  const cors = require('cors')
  app.use(cors(corsOptions))
}

const PORT = process.env.PORT || 3000

app.use(bodyParser.json());

app.use('/api', apiRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

