import { useRouter } from "next/router";
import {
  auth,
  firestore,
  googleAuthProvider,
} from "../lib/firebase";
import { useContext, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import UserContext from "../lib/context";
import debounce from "lodash.debounce";


export default function Enter(props) {
  const { user, username } = useContext(UserContext);
  const [authInfo, setAuthInfo] = useState({username: '', password: ''})
  
  function handleChange(e) {
    e.preventDefault();
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    setAuthInfo(authInfo => ({
      ...authInfo,
      [fieldName]: fieldValue,
    }))
  }

  const router = useRouter();

  useEffect(() => {
    function rediIfUsername() {
      if (username) {
        router.push("/");
      }
    }
    rediIfUsername();
  });

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <>
          <form>
            <label htmlFor="username">Username </label>
            <input type="email" name='username' onChange={handleChange}/>
            <label htmlFor="password">Password: </label>
            <input type="password" name='password' onChange={handleChange}/>
          </form>
          <SignInButton email={authInfo.username} password={authInfo.password}/>
        </>
      )}
    </main>
  );
}

// Sign in with Google button
function SignInButton({email, password}) {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const signInWithEmail = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
  };
  
  return (
    <>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <p>Don't have an account? <Link href='/signup'>Sign up</Link> now</p>
      <button type='submit' className="btn-google" onClick={() => signInWithEmail(email, password)}>
        Sign in with Email
      </button>
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src="/google.png" alt="google logo" /> Sign in with Google
      </button>
    </>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function UsernameForm() {
  const [formData, setFormData] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  useEffect(() => {
    checkUsername(formData);
  }, [formData]);

  function handleChange(evt) {
    const val = evt.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (val.length < 3) {
      setFormData(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormData(val);
      setLoading(true);
      setIsValid(false);
    }
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    // Create References for both user uid and username
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formData}`);

    // Batch both of them at the same time. Either both success or faile
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formData,
      photoURL: user.photoURL,
      displayName: user.displayName,
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  }

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
      return <p>Checking...</p>;
    } else if (isValid) {
      return <p className="text-success">Username {username} is available!</p>;
    } else if (username && !isValid) {
      return (
        <p className="text-danger"> Username {username} is not available!</p>
      );
    } else {
      return <p></p>;
    }
  }

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={(evt) => handleSubmit(evt)}>
          <UsernameMessage
            username={formData}
            isValid={isValid}
            loading={loading}
          />
          <input
            type="username"
            placeholder="username"
            value={formData}
            onChange={handleChange}
          />
          <button type="submit" className="btn-grenn" disabled={!isValid}>
            Choose
          </button>
        </form>
        {/* <h3>Debug State</h3>
        <div>
          Username: {formData}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div> */}
      </section>
    )
  );
}
