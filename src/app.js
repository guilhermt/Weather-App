const path = require('path');
const hbs = require('hbs');
const express = require('express');
const weather = require('./utils/weather');
const geocode = require('./utils/geocode');

const PORT = process.env.PORT || 5000;

console.log(process.env.PORT);

const app = express();

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.use(express.static(publicPath));

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (request, response) => {
  response.render('index.hbs', {
    title: 'Weather',
    name: 'Guilherme',
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    title: 'About Me',
    name: 'Guilherme',
  });
});

app.get('/help', (request, response) => {
  response.render('help.hbs', {
    message: 'Help Message: Contact us',
    title: 'Help',
    name: 'Guilherme',
  });
});

app.get('/weather', (request, response) => {
  const { adress } = request.query;
  if (!adress) return response.send({ error: 'Adress must be provided' });

  geocode(adress, (error, data) => {
    if (error) return response.send({ error });

    weather(data, (error, data) => {
      if (error) return response.send({ error });
      response.send({ ...data, adress });
    });
  });
});

app.get('/help/*', (request, response) => {
  response.render('404.hbs', {
    title: '404 Error',
    name: 'Guilherme',
    ErrorMessage: 'Help article not found.',
  });
});

app.get('*', (request, response) => {
  response.render('404.hbs', {
    title: '404 Error',
    name: 'Guilherme',
    ErrorMessage: 'Page not found!',
  });
});

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
