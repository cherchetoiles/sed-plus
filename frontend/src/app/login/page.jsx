'use client';
import { useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import axios from 'axios';

// Configuration Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCqI9svgTf2pS25i1tJXLhPri-AmrDk_3I',
  authDomain: 'sed-plus.firebaseapp.com',
  projectId: 'sed-plus',
  storageBucket: 'sed-plus.appspot.com',
  messagingSenderId: '459294820128',
  appId: '1:459294820128:web:f61925409903bceedc3945',
};

const app = initializeApp(firebaseConfig);

export default function LoginPage() {
  const handleLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Appel backend pour créer ou retrouver l'utilisateur
      const response = await axios.post('http://localhost:5000/api/users/google', {
        email: user.email,
        name: user.displayName,
        googleId: user.uid,
      });

      alert(`✅ Bienvenue ${response.data.name || response.data.email} !`);
    } catch (error) {
      console.error('❌ Erreur de connexion Google :', error);
      alert('Erreur lors de la connexion.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Connexion</h1>
      <button onClick={handleLogin}>Se connecter avec Google</button>
    </div>
  );
}
