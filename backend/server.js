const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

// Handling unCaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down server due to UnCaughtException");
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });

// connecting to database
connectDatabase();

// Listening to port
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is online at http://localhost:${process.env.PORT}`);
});

// Unhandled Promise rejection Error handling
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit();
  });
});
