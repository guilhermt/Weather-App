const request = require('request');

const weather = ({
  latitude, longitude, location,
}, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=69f60157d93e349d921e153108b1ec71&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) return callback('Unable to connect to weather API');
    if (!response.body.current) return callback('Unable to find the coordenates. Try another one');

    const data = response.body.current;
    const output = {
      forecast: `Weather: ${data.weather_descriptions[0]}. Now it's ${data.temperature}° and feels like ${data.feelslike}°.`,
      location,
    };

    callback(undefined, output);
  });
};

module.exports = weather;
