import Stripe from "stripe";
import CryptoJS from "crypto-js";
export const stripe = new Stripe(
  "sk_test_51MU9HlCA7oiCJnI206zimcWJXvPEH6pryrjKzCypAy6kfTOwURVHHJHAbf4ZqaLqBSpAhu4pUCh1Cfd15KxshIiO00g8zZsjxx"
);
// const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY);

export const createPaymentLink = async (booking, userEmail, paymentId) => {
  const { price, storageListing, _id } = booking;

  // Encrypt user object
  const encryptedPaymentId = CryptoJS.AES.encrypt(paymentId, process.env.ENCRYPTION_KEY).toString();

  try {
    // stripe.
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
      success_url: `${process.env.WEB_URL}/your-storage/payment-successful?paymentId=${encryptedPaymentId}&response=successful&bookingId=${_id}`,
      cancel_url: `${process.env.WEB_URL}/your-storage/payment-error?paymentId=${encryptedPaymentId}&response=failed&bookingId=${_id}`,
    });

    console.log(session);

    return { paymentLink: session.url };
  } catch (error) {
    console.log(error);
  }
};
