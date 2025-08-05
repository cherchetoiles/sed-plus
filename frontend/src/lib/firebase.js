import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCqI9svgTf2pS25i1tJXLhPri-AmrDk_3I",
  authDomain: "sed-plus.firebaseapp.com",
  projectId: "sed-plus",
  storageBucket: "sed-plus.firebasestorage.app",
  messagingSenderId: "459294820128",
  appId: "1:459294820128:web:f61925409903bceedc3945"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
