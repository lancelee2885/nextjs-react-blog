import { useRouter } from "next/router";
import {
  auth,
  emailAuthProvider,
  firestore,
  googleAuthProvider,
} from "../lib/firebase";
import { useContext, useState, useEffect, useCallback } from "react";
import UserContext from "../lib/context";

export default function Signup(props) {
  const { user, username } = useContext(UserContext);
  const [newUserInfo, setNewUserInfo] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    setNewUserInfo((newUserInfo) => ({
      ...newUserInfo,
      [fieldName]: fieldValue,
    }));
  }

  const router = useRouter();

  useEffect(() => {
    function rediIfUsername() {
      if (username) {
        router.push("/enter");
      }
    }
    rediIfUsername();
  });

  useEffect(() => {
      function matchPassword(password, confirmPassword) {
          setPasswordMatch(password === confirmPassword);
      }
      matchPassword(newUserInfo.password, newUserInfo.confirmPassword);
  }, [newUserInfo]);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      <form>
        <label htmlFor="email"></label>Email: 
        <input type="email" name="email" onChange={handleChange}/>
        <label htmlFor="password"></label>Password: 
        <input type="password" name="password" onChange={handleChange}/>
        <label htmlFor="confirmPassword"></label>Confirm Password: 
        <input type="password" name="confirmPassword" onChange={handleChange}/>
        {!passwordMatch ? <p>Password does not match.</p> : null}
      </form>
    </main>
  );
}
