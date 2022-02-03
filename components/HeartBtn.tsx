import { firestore, auth, increment } from "../lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";

/**
 * Allows user to like a post and sending data to backend (firebase)
 * @param param0
 */
function HeartBtn({ postRef }) {
  // listening to heart subcollection
  const heartRef = postRef.collections("hearts").doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  async function addHeart(){
    const uid = auth.currentUser.uid;
    // need to batch because we are updating two documents at the same time
    const batch = firestore.batch();
    
    batch.update(postRef, {heartCount: increment(1)});
    batch.set(heartRef, {uid});

    await batch.commit();
  }

  async function removeHeart(){
    const batch = firestore.batch();
    batch.update(postRef, {heartCount: increment(-1)});
    batch.delete(heartRef);

    await batch.commit();
  }

  return heartDoc?.exists ? (
    <button onClick={removeHeart}>Unheart</button>
  ) : (
    <button onClick={addHeart}>Heart</button>
  );
}

export default HeartBtn;
