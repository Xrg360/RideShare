import { initializeApp } from 'firebase/app';

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

const firebaseConfig = {
  apiKey: "AIzaSyC1P9bqOWLX1SapmCg466wmqsFkkfjjsUc",
  authDomain: "sampletwo-25a6f.firebaseapp.com",
  databaseURL: "https://sampletwo-25a6f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sampletwo-25a6f",
  storageBucket: "sampletwo-25a6f.appspot.com",
  messagingSenderId: "155287396018",
  appId: "1:155287396018:web:ef6300c8018510079533ab"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
