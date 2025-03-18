const express = require('express')
const apiRouter = require('./routes/apiRouter')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
// Load environment variables
require('dotenv').config();

const corsOptions = {
  origin: 'http://localhost:5173',
}

app.use(express.static(path.join(__dirname, '../dist')))
const PORT = process.env.PORT || 3000

if (process.env.ENV === 'dev') {
  const cors = require('cors')
  app.use(cors(corsOptions))

  const swaggerUi = require('swagger-ui-express');
  const swaggerJsDoc = require('swagger-jsdoc');


  // Swagger setup
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API documentation',
      },
      servers: [
        {
          url:`http://localhost:${PORT}`,
        },
      ],
    },
    apis: ['./routes/*.js'], // files containing annotations as above
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}



app.use(bodyParser.json());

app.use('/api', apiRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
  console.log('Environment:', process.env.ENV)
})

