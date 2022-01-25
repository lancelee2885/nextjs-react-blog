import styles from "../../styles/Admin.module.css";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useContext, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import UserContext from "../../lib/context";
import { auth, firestore } from "../../lib/firebase";
import kebabCase from "lodash.kebabcase";
import { serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";

function AdminPostsPage({}) {
  return (
    <main>
      <AuthCheck>
        <CreateNewPost />
        <PostList />
      </AuthCheck>
    </main>
  );
}

function PostList() {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const query = ref.orderBy("createdAt", 'desc');
  const [querySnapshot] = useCollection(query);

  const posts = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Edit Previous Posts</h1>
      <PostFeed posts={posts} admin />
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));

  const isValid = title.length > 3 && title.length < 100;

  async function createPost(e) {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("posts")
      .doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: "default content",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0,
    };

    await ref.set(data);
    toast.success('Post Created');
    router.push(`/admin/${slug}`);
  }

  return (
    <>
      <h1>New Post</h1>
      <form onSubmit={(e) => createPost(e)}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post Name"
          className={styles.input}
        />
        <p>
          <strong>slug: {slug}</strong>
        </p>
        <button type="submit" disabled={!isValid} className="btn-green">
          Create New Post
        </button>
      </form>
    </>
  );
}

export default AdminPostsPage;
