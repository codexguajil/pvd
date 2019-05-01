const express = require('express')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express()
const port = 3000
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//get city data from storage
app.get('/api/v1/cities', (request, response) => {
  database('cities').select()
    .then((cities) => {
      response.status(200).json(cities);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

