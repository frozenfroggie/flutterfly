const mongoose = require('mongoose');
const logger = require("./logger");

module.exports = () => {
  const db = process.env.MONGO_URI;
  mongoose.connect(db, {useNewUrlParser: true}).then(() => logger.info(`Connected to ${db}...`));
  // Due to MongoDB driver deprecations:
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
};
