const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI, (err) => {
    if (err) console.log("Database not working!!", err);
    else console.log(`Database Online!!! ${process.env.DB_URI}`);
  });
};

module.exports = connectDatabase;
