import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import { Server as Socket } from 'socket.io';
import mongodb, { ObjectId } from 'mongodb';
import axios from 'axios';
import stripePackage from 'stripe';

const stripe = new stripePackage('sk_test_51JEIObC0PsLvELgeOk7nfQu1YLKcUbNQPIrfhUhFq3YtUOCmZVngrSY2c8StCIA1aeKxwK6kum9ccsNlPRtOpOq700X9siHcMC');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
}));
app.use(morgan('combined'));
app.use(express.json());

const port = process.env.PORT || "4000";
const MONGO_URI = 'mongodb+srv://KarloAldrete:YouDontKnowMe01.@patioinmobiliario.r805ery.mongodb.net/test';

const server = http.createServer(app);

const io = new Socket(server, {
    cors: {
        origin: 'http://localhost:5173',
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

    socket.on('property-details', (data) => {
        console.log(data);

        const collection = db.db('PatioInmobiliario').collection('properties');

        collection.findOne({ _id: new ObjectId(data.id) }, (err, result) => {
            if (err) {
                console.log(err);
                return;
            }



            socket.emit('property-details', result);
        });
    });
});


app.post('/api/create-checkout-session', async (req, res) => {
    const cartItems = req.body.cartItems || [];

    try {
        const line_items = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    description: item.description,
                    images: item.images,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://example.com/cancel',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
        });


        res.status(200).json(session);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Ocurrió un error al crear la sesión de pago' });
    }
});



server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});