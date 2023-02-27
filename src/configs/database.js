const mongoose = require("mongoose");
const configs = require("./configs");
mongoose.set('strictQuery', true);
const DBconnection = async () => {
  const conn = await mongoose
    .connect(configs.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connect database successfully");
    })
    .catch((err) => {
      console.log(`For some reasons we couldn't connect to the DB`, err);
    });
};

module.exports = DBconnection;
