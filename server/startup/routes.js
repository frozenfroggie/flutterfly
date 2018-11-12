const authRoutes = require('../routes/auth');
const placeRoutes = require('../routes/place');
const flightRoutes = require('../routes/flight');

module.exports = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/place', placeRoutes);
  app.use('/api/flight', flightRoutes);
};
