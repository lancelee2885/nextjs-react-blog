import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export const useUserData = () => {
    const [user] = useAuthState(auth);
    const [username, setUsername] = useState(null);
  
    useEffect(() => {
      // turn off realtime subscription
      let unsubscribe;
  
      if (user) {
        const ref = firestore.collection('users').doc(user.uid);
  
        // firebase returns a function that when called, will unsubscribe from that data
        unsubscribe = ref.onSnapshot((doc) => {
          setUsername(doc.data()?.username);
        }); 
      } else {
        setUsername(null);
      }
  
      return unsubscribe;
  
    }, [user]);

    return { user, username } 
}