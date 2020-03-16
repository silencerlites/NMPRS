const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_KbmqnhSkvzk5Dxjkk4x7b2Ew00LjxBSfRs");
const cors = require("cors")({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.createStripeCharge = functions.firestore
  .document("Payment/{pushId}")
  .onCreate(async (snap, context) => {
    try {
      const charge = {
        amount: snap.data().amount * 100,
        source: snap.data().source.id,
        currency: "PHP"
      };
      const idempotencyKey = context.params.pushId;
      const response = await stripe.charges.create(charge, {
        idempotency_key: idempotencyKey
      });
      await snap.ref.set(response, {
        merge: true
      });
    } catch (error) {
      await snap.ref.set(
        {
          error: userFacingMessage(error)
        },
        {
          merge: true
        }
      );
    }
  });
function userFacingMessage(error) {
  return error.type
    ? error.message
    : "An error occurred, developers have been alerted";
}
