import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBviHDNZZy-i6L_b3VzA_hCcCxtzF79th8",
    authDomain: "nextfire-blog-14140.firebaseapp.com",
    projectId: "nextfire-blog-14140",
    storageBucket: "nextfire-blog-14140.appspot.com",
    messagingSenderId: "44935912834",
    appId: "1:44935912834:web:53fa0fa374af9c7d9cc39b"
  };

if (!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();