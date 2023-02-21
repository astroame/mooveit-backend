import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-02-21",
});

export const createPayment = async (data) => {
  const { price } = data;
  console.log(data, "stripe");
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: { currency: "usd", product_data: { name: "T-shirt" }, unit_amount: 2000 },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    });

    console.log(session, "session");
  } catch (error) {
    console.log(error);
  }
};
