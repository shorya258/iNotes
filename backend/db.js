const mongoose = require("mongoose");
const mongoURI =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, () => {
      console.log("Connected to Mongo successfully :)");
    })
    .catch((error) => console.log("error"));
};
mongoose.set("strictQuery", true);

module.exports = connectToMongo;
