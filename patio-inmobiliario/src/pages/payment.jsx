import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useCart } from '../context/CartContext';

const stripePromise = loadStripe('pk_test_51JEIObC0PsLvELgecyktywTXiyjs1vNovXJP8NLhqI3U8VnFvkaxycmVti6IdStUihO0Uhq3qxjsy8rojQZAkftL00pnkqyaXp');

import '../styles/payment.css';

import { useParams } from "react-router-dom";

import io from "socket.io-client";

const socket = io("http://localhost:4000/payment");

function Payment() {
    const [propertyInfo, setPropertyInfo] = useState(null);
    const { id } = useParams();
    const { cartItems } = useCart();

    useEffect(() => {

        socket.emit("property-details", { id });

        socket.on("property-details", (data) => {
            console.log(data);
            setPropertyInfo(data);
        });

    }, [id, socket]);

    const redirectToCheckout = async () => {
        const stripe = await stripePromise;

        const response = await fetch('http://127.0.0.1:4000/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cartItems }),
        });

        if (response.ok) {
            const session = await response.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                toast.error(result.error.message);
            }
        } else {
            toast.error('Ocurrió un error al crear la sesión de pago');
        }
    };

    return (
        <div className="App">
            <Navbar />

            <div className="property-container">

                <button onClick={redirectToCheckout}>Pagar con Stripe</button>

            </div>

            <Footer />
        </div>

    );

}

export default Payment;
