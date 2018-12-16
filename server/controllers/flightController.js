const axios = require('axios');
const geoip = require('geoip-lite');
const airports = require('../airports2.json');

let authorizationHeader;

const getNearestLocations = async (ll) => {
  try {
    const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations/airports?latitude=${ll[0]}&longitude=${ll[1]}`, { headers: { Authorization: authorizationHeader } });
    const nearestLocations = response.data;
    return nearestLocations;
  } catch(err) {
    throw err;
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
    const response = await axios.get(`https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=${nearestAirport}&departureDate=${dateRange.from},${dateRange.to}&viewBy=COUNTRY`, { headers: { Authorization: authorizationHeader } });
    const inspirations = response.data.data;
    const currency = response.data.meta.currency;
    return { inspirations, currency };
  } catch(err) {
    console.log(err.response.data);
    return null;
    // throw new Error('Error in getting inspirations');
  }
}

const getLocationInfo = async (destination) => {
  try {
    const airport = airports.find(airport => airport.iata === destination);
    let response;
    if(airport && airport.lat && airport.lon) {
      response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${airport.lat},${airport.lon}&key=${process.env.GOOGLE_API_KEY}`);
    }
    if(response && response.data) {
      return {
        city: response.data,
        airport
      }
    } else {
      return null
    }
  } catch(err) {
    debugger;
    throw err;
  }
}

module.exports = {
  inspirations: async (req,res) => {
    let inspirationsData;
    try {
      // find client latitude and longitude coordinates based on ip
      let ip = (req.headers['x-forwarded-for'] || '').split(',').pop() || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
      // For testing purposes, set ip to 207.97.227.239 to work on localhost
      ip = "185.126.66.172";
      const { ll } = geoip.lookup(ip);
      authorizationHeader = req.headers['authorization'];
      const accessToken = authorizationHeader.split(" ")[1];
      console.log(authorizationHeader);
      console.log(accessToken);
      if(!accessToken || accessToken === 'undefined') {
        console.log('Not authenticated')
        debugger;
        return res.status(401).json({
          msg: 'Not authenticated'
        });
      }
      // get most relevant airports in a radius of 500 km around the client coordinates
      const nearestLocations = await getNearestLocations(ll);
      // console.log(nearestLocations)
      // let nearestLocation = nearestLocations.data.reduce((previousLocation, currentLocation) => {
      //   return (currentLocation.distance < previousLocation.distance) ? currentLocation : previousLocation;
      // });
      // console.log(nearestLocation);
      // For testing purposes, set nearest airport to PAR (Paris), sandbox API doesnt return any results for aiports in my country (Poland)
      // nearestLocation.airport = 'PAR';

      // get inspirations
      const dateRange = getDateRange();
      let inspirations;
      let currency;
      for(let i = 0; i < nearestLocations.data.length; i++) {
        const response = await getInspirations(nearestLocations.data[i].iataCode, dateRange);
        if(response && response.inspirations) {
          inspirations = response.inspirations;
          currency = response.currency;
          break;
        }
      }
      let inspirationsNum = 0;
      if(!inspirations) {
        res.json({results: []});
      }
      for(let i = 0; inspirationsNum < 6; i++) {
        console.log(inspirationsNum)
        const inspiration = inspirations[i];
        const destination = inspiration.destination;
        const price = inspiration.price;
        // get additional info about destination
        const locationInfo = await getLocationInfo(destination);
        console.log("locationInfo", locationInfo)
        if(locationInfo) {
          inspirationsNum++;
          inspiration.location_info = locationInfo;
        }
        inspiration.origin = nearestLocations.data[0].iataCode;
        inspiration.originLocation = ll;
      }

      res.json(inspirations);
    } catch(err) {
      console.log(err);
      debugger;
      if(err.response.status === 401) {
        return res.status(401).json({
          msg: 'Not authenticated'
        });
      }
      res.status(500).json(err);
    }
  },
  autocomplete: async (req, res) => {
    try {
      const term = req.params.term;
      const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/locations?view=LIGHT&subType=AIRPORT&keyword=${term}`, { headers: { Authorization: authorizationHeader } })
      res.json(response.data.data);
    } catch(err) {
      debugger;
      if(err.response.status === 401) {
        return res.status(401).json({
          msg: 'Not authenticated'
        });
      }
      res.status(500).json({msg: err});
    }
  },
  lowFareSearch: async (req, res) => {
    try {
      const { origin, destination, departure_date, return_date, travel_class, adults, currency } = req.query;
      const response = await axios.get(`https://test.api.amadeus.com/v1/shopping/flight-offers?origin=${origin}&destination=${destination}&departureDate=${departure_date}&max=5${return_date !== '' ? '&returnDate=' + return_date : ''}&adults=${adults}&travelClass=${travel_class}&currency=${currency}`, { headers: { Authorization: authorizationHeader } })
      res.json(response.data.data);
    } catch(err) {
      if(err.response.data.errors[0].status === 404) {
        res.status(404).json({msg: err.response.data.message});
      }
      res.status(500).json({msg: err});
    }
  }
};
