'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
export default function SignIn(){
  const [email,setEmail]=useState("");
  return (<main style={{display:'grid',placeItems:'center',minHeight:'70vh'}}>
    <div style={{border:'1px solid #ddd', padding:24, borderRadius:8, minWidth:320}}>
      <h1>Sign in</h1>
      <p>We’ll email you a secure link.</p>
      <form onSubmit={async e=>{e.preventDefault(); await signIn('email',{ email })}}>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="you@example.com" style={{width:'100%', padding:10, marginTop:8}}/>
        <button type="submit" style={{marginTop:12, padding:'10px 14px'}}>Email me a link</button>
      </form>
    </div>
  </main>);
}
