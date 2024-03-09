const app = require("./app");
const connectDatabase = require("./db/database");
const PORT = process.env.PORT || 5000;

// Handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server for handling uncaught exceptions");
});

// config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

//  connect db
connectDatabase();

// Create server
const server = app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Sutting down server for ${err.message}`);
  console.log(`Shutting down the server for unhandled rejection`);

  server.close(() => {
    process.exit(1);
  });
});
