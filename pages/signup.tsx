import { useRouter } from "next/router";
import {
  auth,
} from "../lib/firebase";
import { useContext, useState, useEffect, useCallback } from "react";
import UserContext from "../lib/context";

export default function Signup(props) {
  const { user, username } = useContext(UserContext);
  const [newUserInfo, setNewUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validInfo, setValidInfo] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    e.preventDefault();
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    setNewUserInfo((newUserInfo) => ({
      ...newUserInfo,
      [fieldName]: fieldValue,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(newUserInfo);
    try {
        await auth.createUserWithEmailAndPassword(newUserInfo.email, newUserInfo.password);
    } catch(err) {
        console.log(err);
    }
  }

  const router = useRouter();

  useEffect(() => {
    function rediIfUsername() {
      if (user) {
        router.push("/enter");
      }
    }
    rediIfUsername();
  });

  useEffect(() => {
      function validatePassword(password, confirmPassword) {
        const validRe = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        const matchingPassword = password === confirmPassword;
        if (validRe.test(password) && matchingPassword){
            setValidInfo(true);
        } else if (!validRe.test(password)) {
            setErrorMsg('Invalid password');
            setValidInfo(false);
        } else if (!matchingPassword) {
            setErrorMsg('Password does not match');
            setValidInfo(false);
        }
      }
      validatePassword(newUserInfo.password, newUserInfo.confirmPassword);
  }, [newUserInfo]);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="email"></label>Email: 
        <input type="email" name="email" onChange={handleChange}/><hr></hr>
        <label htmlFor="password"></label>Password: 
        <input type="password" name="password" onChange={handleChange}/>
        <small>Password must contain a minimum of 8 characters at least one letter and one number</small><hr></hr>
        <label htmlFor="confirmPassword"></label>Confirm Password: 
        <input type="password" name="confirmPassword" onChange={handleChange}/>
        {!validInfo ? <p>{errorMsg}</p> : null}
        <button type="submit" disabled={!(newUserInfo.password === newUserInfo.confirmPassword)}>Sign up</button>
      </form>
    </main>
  );
}
