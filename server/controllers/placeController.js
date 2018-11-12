const axios = require('axios');

const getPhoto = async (cityName) => {
  try {
    console.log(cityName);
    const response =  await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${cityName}&key=${process.env.GOOGLE_API_KEY}`);
    console.log(response);
    console.log(response.data);
    const photo = response.data.results[0].photos[0];
    return photo;
  } catch (err) {
    return {};
  }
}

module.exports = {
  search: async (req, res) => {
    try {
      const city = req.params.city;
      const photo = await getPhoto(city);
      res.json(photo);
    } catch(err) {
      res.status(500).json(err);
    }
  }
};
