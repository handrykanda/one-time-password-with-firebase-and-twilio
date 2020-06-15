// const { db, admin } = require("../util/admin");
// const twilio = require("../util/twilio");
// const { phoneNumber } = require("../util/twilioCred");

// // user sign up
// exports.signup = (req, res) => {
//   //verify the user provided a phone
//   if (!req.body.phone) {
//     return res.status(422).json({ phone: "Phone number is required!" });
//   }

//   //format the phone number to remove dashes and parens
//   const phone = String(req.body.phone).replace(/[^\d]/g, "");

//   //create a user account using that phone
//   admin
//     .auth()
//     .createUser({ uid: phone })
//     .then((user) => res.status(201).json({ user }))
//     .catch((err) => {
//       if (err.code === "auth/uid-already-exists") {
//         return res
//           .status(400)
//           .json({ phone: "Phone number is already in use" });
//       } else {
//         return res.status(500).json({ general: err });
//       }
//     });
// };

// //request one time password
// exports.requestOneTimePass = (req, res) => {
//   if (!req.body.phone) {
//     return res.status(422).json({ phone: "Phone number is required!" });
//   }

//   const phone = String(req.body.phone).replace(/[^\d]/g, "");

//   admin
//     .auth()
//     .getUser(phone)
//     .then((userRecord) => {
//       const code = Math.floor(Math.random() * 8999 + 1000);
//       twilio.messages.create(
//         {
//           body: "Your code is " + code,
//           to: phone,
//           from: phoneNumber,
//         },
//         (err) => {
//           if (err) {
//             return res.status(422).json({ message: err });
//           }
//           db.doc(`/users/${phone}`).update({ code, codeValid: true }, () => {
//             res
//               .status(200)
//               .json({ message: "Message sent to you succesfully" });
//           });
//         }
//       );
//     })
//     .catch((err) => {
//       return res.status(500).json({ user: err.code });
//     });
// };

// //verify one time password
// exports.verifyoneTimePass = (req, res) => {
//   if (!req.body.phone || !req.body.phone) {
//     return res
//       .status(422)
//       .json({ error: "Phone number and code are required!" });
//   }
//   const phone = String(req.body.phone).replace(/[^\d]/g, "");
//   const code = parseInt(req.body.code);
//   admin
//     .auth()
//     .getUser(phone)
//     .then(() => {
//       db.doc(`/users/${phone}`).on("value", (snapshop) => {
//         db.doc(`/users/${phone}`).off();
//         const user = snapshop.val();
//         if (user.code != code || !user.codeValid) {
//           return res.status(422).json({ error: "Code is not valid!" });
//         }

//         db.doc(`/users/${phone}`).update({ codeValid: false });
//         admin
//           .auth()
//           .createCustomToken(phone)
//           .then((token) => res.status(200).json({ token }))
//           .catch((err) => {
//             return res.status(422).json({ user: err });
//           });
//       });
//     })
//     .catch((err) => {
//       return res.status(422).json({ user: err });
//     });
// };
