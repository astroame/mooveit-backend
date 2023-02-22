import Stripe from "stripe";
const stripe = new Stripe(
  "sk_test_51MU9HlCA7oiCJnI206zimcWJXvPEH6pryrjKzCypAy6kfTOwURVHHJHAbf4ZqaLqBSpAhu4pUCh1Cfd15KxshIiO00g8zZsjxx"
);
// const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY);

export const createPaymentLink = async (booking, userEmail) => {
  const { price, storageListing } = booking;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: { name: storageListing.storageTitle, images: [...storageListing.media] },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      mode: "payment",
      success_url: "http://localhost:4242/success.html",
      cancel_url: "http://localhost:4242/cancel.html",
    });

    return {
      paymentLink: session.url,
      id: session.id,
      status: session.status,
    };
  } catch (error) {
    console.log(error);
  }
};
