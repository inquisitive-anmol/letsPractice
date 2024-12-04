require("dotenv").config();

// validate environment variables
try {
  require("./config/validateEnv")();
} catch (error) {
  if (process.env.NODE_ENV !== "production") {
    console.error(error.message);
  }
  process.exit(1);
}

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connectDb = require("./config/db");
const { errorHandler } = require("./middleware/errorHandler");
const limiter = require("./middleware/rateLimiter");
const helmet = require("helmet");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// connect to database
const dbConnection = connectDb();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));



app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorHandler);

module.exports = { app, dbConnection };
