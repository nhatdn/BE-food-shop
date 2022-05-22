const { app, database, auth, config, body_parser } = require("./load");
database();
app.use(body_parser.json({ limit: "50mb" }));
app.use(body_parser.urlencoded({ limit: "50mb", extended: true }));

const versionApi = (routeName) => `/api/v1/${routeName}`;

app.use(versionApi("auth"), auth);

app.use(function (req, res, next) {
  res.status(404).send(new Error("Not Found"));
});

app.listen(config.PORT, function (err) {
  if (!err) {
    console.log(
      `Server running in ${config.ENV} mode on port ${config.PORT} - http://localhost:${config.PORT}`
    );
  } else {
    console.log("Sever run fail");
  }
});
