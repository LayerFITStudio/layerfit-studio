const express = require("express");
const Stripe = require("stripe");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 REPLACE THIS with your Stripe Secret Key later
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
  const { items } = req.body;

  try {
   const line_items = items.map((item) => ({
  price_data: {
    currency: "usd",
    product_data: {
      name: item.name,
      description: item.color
        ? `Color: ${item.color}${item.initials ? " | Initials: " + item.initials : ""}`
        : undefined,
    },
    unit_amount: Math.round(item.price * 100),
  },
  quantity: item.quantity,
}));

    const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items,
  mode: "payment",
  automatic_tax: { enabled: true },
  billing_address_collection: "required",
  shipping_address_collection: {
    allowed_countries: ["US"],
  },
  phone_number_collection: {
    enabled: true,
  },
  success_url: "https://www.layerfitstudio.com/?success=true",
cancel_url: "https://www.layerfitstudio.com/?canceled=true",
});
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating checkout session");
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));
