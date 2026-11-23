const path = require("node:path");

const bodyParser = require("body-parser");
const express = require("express");
const helmet = require("helmet");

const { Route, route } = require("./routes/router");
require("./routes/web");

// const adminRoutes = require("./routes/admin");
// const shopRoutes = require("./routes/shop");
require("./routes/admin");
require("./routes/shop");
const { get404 } = require("./controllers/errors");

const app = express();

app.disable("x-powered-by");
app.use(helmet());

app.set("view engine", "ejs");
app.set("views", "views");

app.locals.route = route;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// path برای همه viewها (حل خطای "path is not defined")
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.use(Route.router);
// app.use("/admin", adminRoutes);
// app.use(shopRoutes);

app.use(get404);

app.listen(3000);
