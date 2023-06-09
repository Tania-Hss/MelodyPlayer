require("dotenv").config();

const express = require("express");
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.HTTP_PORT || 3000;
const db = require("./models");

const client_id = process.env.clientId;
const client_secret = process.env.clientSecret;

app.use(express.json());
app.use(cors());


app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: new pgSession({
      pool: db,
      createTableIfMissing: true
    })
}))

const usersRouter = require("./controllers/users");
const playlistsRouter = require("./controllers/playlists");
const sessionRouter = require('./controllers/session')
const errorHandlingMiddleware = require("./middlewares/errorHandlingMiddleware");

app.use(usersRouter);
app.use(playlistsRouter);
app.use(sessionRouter)

// req to spotify api for access token
app.get("/", async (req, res) => {
  try {
    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(client_id + ":" + client_secret).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { grant_type: "client_credentials" },
    };

    const response = await axios.post(authOptions.url, authOptions.data, {
      headers: authOptions.headers,
    });
    const accessToken = response.data.access_token;
    res.send(accessToken);
  } catch (error) {
    console.error(error);
  }
});

app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log("server started on port:" + port);
});
