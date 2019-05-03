const express = require('express')
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

const app = express()
const port = 3000
app.set('port', process.env.PORT || 3000)
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//get city data
app.get('/api/v1/cities', (request, response) => {
  database('cities').select()
    .then((cities) => {
      response.status(200).json(cities);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//get address pvd data
app.get('/api/v1/addresses', (request, response) => {
  database('addresses').select()
    .then((addresses) => {
      response.status(200).json(addresses);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//add a city to the cities database
app.post('/api/v1/cities', (request, response) => {
  const city = request.body;
  //required params of city(string) and avg_pvw(num)
  for (let requiredParameter of ['city', 'avg_pvw']) {
    if (!city[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { city: <String>, avg_pvw: <Number> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  database('cities').insert(city, 'id')
    .then(city => {
      response.status(201).json({ id: city[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
})