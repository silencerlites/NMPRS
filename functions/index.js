/* eslint-disable consistent-return */
const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_KbmqnhSkvzk5Dxjkk4x7b2Ew00LjxBSfRs");
const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

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

<<<<<<< HEAD
exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {

  if (authUser.email) {
    const customClaims = {
      Customer: true,
    };
    try {
      var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)

      return db.collection("Users").doc(authUser.uid).update({
        email: authUser.email,
        role: customClaims
      })

    } catch (error) {
      console.log(error)
    }


  }

  // return db.collection("roles").doc(user.uid).set({
  //   email: user.email,
  //   subscriber: true
  // }).catch(error => {
  //   console.log(error)
  // })

});

exports.setUserRole = functions.https.onCall(async (data, context) => {

  if (!context.auth.token.Administrator) return


  try {
    var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)

    return db.collection("Users").doc(data.uid).update({
      role: data.role
    })

  } catch (error) {
    console.log(error)
  }

=======
exports.AddUserRole = functions.auth.user().onCreate(async authUser => {
  if (authUser.email) {
    const customClaims = {
      admin: true
    };
    try {
      var _ = await admin
        .auth()
        .setCustomUserClaims(authUser.uid, customClaims);

      return db
        .collection("Users")
        .doc(authUser.uid)
        .update({
          email: authUser.email,
          role: customClaims
        });
    } catch (error) {
      console.log(error);
    }
  }
});

exports.setUserRole = functions.https.onCall(async (data, context) => {
  if (!context.auth.token.admin) return;

  try {
    var _ = await admin.auth().setCustomUserClaims(data.uid, data.role);

    return db
      .collection("roles")
      .doc(data.uid)
      .update({
        role: data.role
      });
  } catch (error) {
    console.log(error);
  }
>>>>>>> 8f4232e2c5205accd7d7a0aa754efc9cec5efc6b
});
