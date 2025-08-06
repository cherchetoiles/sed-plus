'use client';

import { getAuth } from 'firebase/auth';
import app from '@/lib/firebase';
import { useEffect, useState } from 'react';

export default function ProfilPage() {
  const [prenom, setPrenom] = useState('');

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (user) {
      const prenom = user.displayName?.split(' ')[0] || user.displayName;
      setPrenom(prenom);
    }
  }, []);

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">Bonjour {prenom} 👋</h1>
      <p className="mt-4 text-lg text-gray-600">
        Heureux de vous revoir ! On espère que vous allez bien.
      </p>
    </div>
  );
}
