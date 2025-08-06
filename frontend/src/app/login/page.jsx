'use client';

import { useRouter } from 'next/navigation';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import app from '@/lib/firebase';
import axios from 'axios';
import { useState } from 'react';

export default function LoginPage() {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleAuth = async (type) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const payload = {
        email: user.email,
        name: user.displayName,
        googleId: user.uid,
      };

      if (type === 'signup') {
        try {
          await axios.post('http://localhost:5000/api/users', payload);
          router.push('/profil');
        } catch (err) {
          if (err.response?.status === 404) {
            setMessage('Vous possédez déjà un compte.');
          } else {
            setMessage(err.response?.data?.error || "Une erreur est survenue.");
          }
        }
      } else if (type === 'login') {
        try {
          const res = await axios.get(`http://localhost:5000/api/users/${user.email}`);
          if (res.data) {
            router.push('/profil');
          }
        } catch (err) {
          if (err.response?.status === 404) {
            setMessage("Vous n’êtes pas inscrit.");
          } else {
            setMessage(err.response?.data?.error || "Une erreur est survenue.");
          }
        }
      }
    } catch (err) {
      setMessage("Erreur lors de l'authentification Google.");
    }
  };

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-semibold mb-6">Bienvenue !</h1>
      <button
        onClick={() => handleAuth('login')}
        className="bg-blue-500 text-white px-4 py-2 rounded m-2"
      >
        Se connecter avec Google
      </button>
      <button
        onClick={() => handleAuth('signup')}
        className="bg-green-500 text-white px-4 py-2 rounded m-2"
      >
        S’inscrire avec Google
      </button>
      {message && (
        <p className="mt-4 text-red-500 font-medium">
          {message}
        </p>
      )}
    </div>
  );
}
