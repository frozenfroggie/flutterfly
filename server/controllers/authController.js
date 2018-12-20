const axios = require('axios');

module.exports = {
  getAccessToken: async (req, res) => {
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'client_credentials');
      params.append('client_id', process.env.AMADEUS_CLIENT_ID);
      params.append('client_secret', process.env.AMADEUS_CLIENT_SECRET);
      const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params);
      res.json({ access_token: response.data.access_token });
    } catch(err) {
      res.status(500).json({msg: 'getAccessToken error'});
    }
  }
};
