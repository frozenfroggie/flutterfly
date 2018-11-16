const axios = require('axios');
const geoip = require('geoip-lite');

const getNearestLocations = async (ll) => {
  try {
    const response = await axios.get(`https://api.sandbox.amadeus.com/v1.2/airports/nearest-relevant?apikey=${process.env.AMADEUS_API_KEY}&latitude=${ll[0]}&longitude=${ll[1]}`);
    const nearestLocations = response.data;
    return nearestLocations;
  } catch(err) {
    throw new Error('Error in getting nearest location');
  }
}

const getDateRange = () => {
  let from = new Date();
  let to = new Date();
  to.setMonth(to.getMonth() + 3);
  return {
    from: from.toJSON().split('T')[0],
    to: to.toJSON().split('T')[0]
  }
}

const getInspirations = async (nearestAirport, dateRange) => {
  try {
    const response = await axios.get(`https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey=${process.env.AMADEUS_API_KEY}&origin=${nearestAirport}&departure_date=${dateRange.from}--${dateRange.to}&aggregation_mode=COUNTRY`);
    const inspirations = response.data.results;
    const currency = response.data.currency;
    return { inspirations, currency };
  } catch(err) {
    throw new Error('Error in getting inspirations');
  }
}

const getLocationInfo = async (destination) => {
  try {
    const response = await axios.get(`https://api.sandbox.amadeus.com/v1.2/location/${destination}?apikey=${process.env.AMADEUS_API_KEY}`);
    const locationInfo = response.data;
    return locationInfo;
  } catch(err) {
    throw new Error('Error in getting location info');
  }
}

module.exports = {
  inspirations: async (req,res) => {
    let inspirationsData;
    try {
      // find client latitude and longitude coordinates based on ip
      let ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
      // For testing purposes, set ip to 207.97.227.239 to work on localhost
      ip = "207.97.227.239";
      const { ll } = geoip.lookup(ip);

      // get most relevant airports in a radius of 500 km around the client coordinates
      const nearestLocations = await getNearestLocations(ll);
      let nearestLocation = nearestLocations.reduce((previousLocation, currentLocation) => {
        return (currentLocation.distance < previousLocation.distance) ? currentLocation : previousLocation;
      });
      // For testing purposes, set nearest airport to PAR (Paris), sandbox API doesnt return any results for aiports in my country (Poland)
      nearestLocation.airport = 'PAR';

      // get inspirations
      const dateRange = getDateRange();
      const { inspirations, currency } = await getInspirations(nearestLocation.airport, dateRange);
      let inspirationsNum = 0;
      for(let i = 0; i < 6; i++) {
        const inspiration = inspirations[i];
        const destination = inspiration.destination;
        const price = inspiration.price;
        // get additional info about destination
        const locationInfo = await getLocationInfo(destination);
        inspiration.location_info = locationInfo;
      }

      res.json(inspirations);
    } catch(err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  autocomplete: async (req, res) => {
    try {
      const term = req.params.term;
      const response = await axios.get(`https://api.sandbox.amadeus.com/v1.2/airports/autocomplete?apikey=${process.env.AMADEUS_API_KEY}&term=${term}`)
      res.json(response.data);
    } catch(err) {
      res.status(500).json({msg: err});
    }
  },
  lowFareSearch: async (req, res) => {
    try {
      const { origin, destination, departure_date, return_date, travel_class, adults } = req.query;
      const response = await axios.get(`https://api.sandbox.amadeus.com/v1.2/flights/low-fare-search?apikey=${process.env.AMADEUS_API_KEY}&origin=${origin}&destination=${destination}&departure_date=${departure_date}&number_of_results=5${return_date !== '' ? '&return_date=' + return_date : ''}&adults=${adults}&travel_class=${travel_class}&currency=PLN`)
      console.log('???', response);
      res.json(response.data);
    } catch(err) {
      console.log(err.response.data.message);
      if(err.response.data.message === 'No result found.') {
        res.status(404).json({msg: err.response.data.message});
      }
      res.status(500).json({msg: err});
    }
  }
};
