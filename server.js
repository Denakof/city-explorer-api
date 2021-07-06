
const express = require('express');

const server = express();
require('dotenv').config();

const cors = require('cors');
server.use(cors());


const weatherData = require('./data/weather.json')

// const PORT = 3005;
const PORT = process.env.PORT;



server.get('/', (request, response) => {
    response.status(200).send('home route')
})

// localhost:3001/
server.get('/test', (request, response) => {
    response.status(200).send('my server is working')

});
server.get('/weather', (request, response) => {
    console.log(request.query);

    let searchQuery = weatherData.find(city => {
        if(city.city_name == request.query.city_name){
                    return city;
                }
                
            });
            response.status(200).send(searchQuery.data.map(day => new Weather(day) ));

    })
   

    server.get('*', (request, response) => {
        response.status(404).send('NOT FOUND');
    });

    server.listen(PORT, () => {
        console.log(`listening on ${PORT}`)
    });

    class Weather {
        constructor (data){
            this.description = data.weather.description
            this.date=data.datetime
            console.log(data);
        }
    
    }