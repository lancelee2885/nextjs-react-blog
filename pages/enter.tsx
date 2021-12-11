import { auth, googleAuthProvider } from '../lib/firebase';
import Image from 'next/image';
import { useContext } from "react";
import UserContext from "../lib/context";

export default function Enter(props) {

  const { user, username } = useContext(UserContext);


  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? 
        !username ? <UsernameForm /> : <SignOutButton /> 
        : 
        <SignInButton />
      }
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src='/google.png' alt='google logo' /> Sign in with Google
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  return <>123</>;
}