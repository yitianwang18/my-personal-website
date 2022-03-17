
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyCcu9HEoryIOWxNFoSzZv0cplhAahr6YMQ",
authDomain: "cse134-hw5-ebe3e.firebaseapp.com",
projectId: "cse134-hw5-ebe3e",
storageBucket: "cse134-hw5-ebe3e.appspot.com",
messagingSenderId: "57098663997",
appId: "1:57098663997:web:c8baf51ce45ec73953d254",
measurementId: "G-MG1BL7EMTV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
