import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCI4tcs1ltsXVfkSeFLL_I1BQQolyRDVS0",
    authDomain: "pricehunt-3444c.firebaseapp.com",
    projectId: "pricehunt-3444c",
    storageBucket: "pricehunt-3444c.appspot.com",
    messagingSenderId: "530590871075",
    appId: "1:530590871075:web:76f21d698cf8d4bf2f0b96",
    measurementId: "G-QBZEWRJQX8"
  };
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };