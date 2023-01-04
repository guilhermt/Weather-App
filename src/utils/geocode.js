const request = require('request');

const geocode = (adress, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=7dcfd64f2374685bef8326787defa92f&query=${adress}&limit=1&output=json`;

  request({ url, json: true }, (error, response) => {
    if (error) return callback('Unable to get the coordenates', undefined);
    if (!response.body.data[0]) return callback('Error: Unable to find location, try another one ', undefined);

    const {
      latitude, longitude, name, region,
    } = response.body.data[0];

    const location = `${name}, ${region}`;

    callback(undefined, {
      latitude, longitude, location,
    });
  });
};

module.exports = geocode;
