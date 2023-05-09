import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDqkMf8y4CYCpya93OuQPJyiSRKXdmAom0",
  authDomain: "twitter-clone-c26b8.firebaseapp.com",
  projectId: "twitter-clone-c26b8",
  storageBucket: "twitter-clone-c26b8.appspot.com",
  messagingSenderId: "774651560168",
  appId: "1:774651560168:web:db763f5679c7c4bfcb095d",
  measurementId: "G-W4LJ30BMT2",
};

// Initialize Firebase
let app;
let messaging;
try {
  app = initializeApp(firebaseConfig);

  messaging = getMessaging(app);
} catch (e) {
  console.error(e.message);
}
export { app, messaging, firebaseConfig };
