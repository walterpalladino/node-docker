const express = require ("express")
const mongoose = require ("mongoose");

const session = require('express-session')
const redis = require('redis')

const cors = require('cors')

const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require("./config/config");

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT
})


const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express()
const port = process.env.PORT || 3000;

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithretry = () => {

    mongoose
    .connect(mongoURL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useFindAndModify:false
        })
    .then(() => {
        console.log("Succesfully Connected to DB")
    })
    .catch((e) => {
        console.log(e)
        setTimeout(connectWithretry, 5000)
    })

};

connectWithretry();


//  Enable proxy now the app is running behind nginx as proxy
app.enable("trust proxy");

//  Enable CORS using default settings
app.use(cors({}));

//  Middleware added to get session management
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: SESSION_SECRET,
        cookie: {
            secure: false,
            resave: false,
            saveUninitialized: false,
            httpOnly: true,
            maxAge: 60000
        }
    })
);

//  Middleware added to get the json data from the request body
app.use(express.json());

app.get("/api/v1", (req, res) => { 
    console.log("/api/v1");

    res.send("<h2>Hi There... Updated to separate nginx serving only api here.</h2>")
})

//  localhost:3000/api/v1/posts
app.use("/api/v1/posts", postRouter);

//  users
app.use("/api/v1/users", userRouter);

app.listen(port, () => console.log(`listening on port ${port}`))

