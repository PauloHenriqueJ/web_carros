
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'



const firebaseConfig = {

  apiKey: "AIzaSyBGTTAczNlbelF9EuImn0hTnKSONnH30qw",

  authDomain: "webcarros-a437b.firebaseapp.com",

  projectId: "webcarros-a437b",

  storageBucket: "webcarros-a437b.appspot.com",

  messagingSenderId: "202319128140",

  appId: "1:202319128140:web:d6881595fd8044907f36e9"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export {db, auth, storage};