import express from 'express';
import Stripe from "stripe";

const app = express();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51QSMbo09mr35rCE03JCWKbuEdPoxdKHhlQc1J6cHnrSClVpfFcjUHS87mtgnTRFgFjy95RZbpfqggWEXRuiHVS7f00dlIDmGNQ";
const SECRET_KEY = "sk_test_51QSMbo09mr35rCE0IQ5d6fdBXWD8263ZXJR2CpEkCo6CJt65bHuWvhAsDFh88FwWTkFOMFGkmiHoYggSMkGGEvYk00pxxJScUE";

const stripe = Stripe(SECRET_KEY, { apiVersion: "2024-11-20" });

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1099, //lowest denomination of particular currency
            currency: "usd",
            payment_method_types: ["card"], //by default
        });

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret: clientSecret,
        });
    } catch (e) {
        console.log(e.message);
        res.json({ error: e.message });
    }
});