// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByOQMJwX34AujdppEQXCr6WagEB5zcsEU",
  authDomain: "matt-cargo.firebaseapp.com",
  projectId: "matt-cargo",
  storageBucket: "matt-cargo.appspot.com",
  messagingSenderId: "134708817769",
  appId: "1:134708817769:web:aa6bc4f4544c9e2d5f97f8",
  measurementId: "G-G7DC11JP2E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase admin

var admin = require("firebase-admin");

var serviceAccount = require("./matt-cargo-firebase-adminsdk-ydi5j-bed844a2e7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "matt-cargo.appspot.com",
});

module.exports = {
  app,
  admin,
};
