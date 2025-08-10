import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByPXIUIfTZetgxqN7tj3v1sfiIiXTeAgE",
  authDomain: "thefutyhub.firebaseapp.com",
  projectId: "thefutyhub",
  storageBucket: "thefutyhub.firebasestorage.app",
  messagingSenderId: "160462048624",
  appId: "1:160462048624:web:fdaa80e007a7be61ce53b5",
  measurementId: "G-E5BHKMMTB1",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
