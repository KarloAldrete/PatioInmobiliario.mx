import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { Server as Socket } from 'socket.io';
import mongodb, { ObjectId } from 'mongodb';
import axios from 'axios';

const app = express();

app.use(cors({
    origin: 'http://127.0.0.1',
}));
app.use(morgan('combined'));

const port = process.env.PORT || "4000";
const MONGO_URI = 'mongodb+srv://KarloAldrete:YouDontKnowMe01.@patioinmobiliario.r805ery.mongodb.net/test';

const server = http.createServer(app);

const io = new Socket(server, {
    cors: {
        origin: 'http://127.0.0.1:5173',
        methods: ['GET', 'POST']
    },
});

const db = await mongodb.MongoClient.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

const home = io.of('/home');
const create = io.of('/create');

create.on('connection', (socket) => {
    console.log('New connection from /create');

    socket.on('createProperty', (propertyData, callback) => {
        console.log(propertyData);

        const collection = db.db('PatioInmobiliario').collection('properties');

        collection.insertOne(propertyData, (err, result) => {
            if (err) {
                console.log(err);
                const response = { ok: false, error: err };
                callback(response);
                return;
            }

            const response = { ok: true };
            callback(response);
        });
    });
});

home.on("connection", (socket) => {
    console.log("New connection from /home");

    const collection = db.db("PatioInmobiliario").collection("properties");

    collection.find({}).toArray((err, result) => {
        if (err) {
            console.log(err);
            return;
        }


        const propertiesWithBase64Images = result.map((property) => {
            const images = Array.isArray(property.images)
              ? property.images.map((image) => {
                  const base64 = Buffer.from(image.buffer).toString("base64");
                  return { ...image, base64 };
                })
              : [];
            return { ...property, images };
          });

        socket.emit("loadProperties", propertiesWithBase64Images);
    });
});





server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});