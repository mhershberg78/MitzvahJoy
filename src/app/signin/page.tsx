'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await signIn('email', { email, callbackUrl: '/' });
  }

  return (
    <main style={{ display: 'grid', placeItems: 'center', minHeight: '70vh' }}>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <h1>Sign in</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
        <button type="submit">Send magic link</button>
      </form>
    </main>
  );
}
