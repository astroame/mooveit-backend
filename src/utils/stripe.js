import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY);

export const createPaymentLink = async (data) => {
  const { price, storageListing } = data;

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
