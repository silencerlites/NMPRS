const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_KbmqnhSkvzk5Dxjkk4x7b2Ew00LjxBSfRs");
const cors = require("cors")({ origin: true });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.checkoutSessions = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // ...
    stripe.checkout.sessions.create(
      {
        success_url: "https://example.com/success",
        cancel_url: "https://example.com/cancel",
        payment_method_types: ["card"],
        line_items: [
          {
            name: "T-shirt",
            description: "Comfortable cotton t-shirt",
            amount: 1500,
            currency: "usd",
            quantity: 2
          }
        ]
      },
      (err, session) => {
        // asynchronously called
        response.send(session);
        console.log(err);
      }
    );
  });
});
