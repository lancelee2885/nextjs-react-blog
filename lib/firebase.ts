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

// save a timestamp on a document on the server. Doesn't rely on client's machine time.
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export const storage = firebase.storage();
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

/** 
 * Returns a user information with username provided
 * @param username 
 */
export async function getUserWithUsername(username) {
  const userRef = firestore.collection('users');
  const query = userRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**
 * Parse firebase document to JSON
 * 
 * @param {DocumentSnapshot} doc
 */
export function postToJson(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  }
}

export const fromMillis = firebase.firestore.Timestamp.fromMillis;
