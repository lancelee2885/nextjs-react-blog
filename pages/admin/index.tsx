import styles from "../../styles/Admin.module.css";
import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import AuthCheck from "../../components/AuthCheck";
import PostFeed from "../../components/PostFeed";
import UserContext from "../../lib/context";
import { auth, firestore, fromMillis, postToJson } from "../../lib/firebase";
import kebabCase from "lodash.kebabcase";
import { serverTimestamp } from "firebase/firestore";
import toast from "react-hot-toast";
import Loader from "../../components/Loader"

const Limit = 5;

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
  const [posts, setPosts] = useState([]);
  const [postsEnd, setPostsEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getMorePosts() {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collection("users")
      .doc(auth.currentUser.uid)
      .collection("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(Limit);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < Limit) {
      setPostsEnd(true);
    }
  }

  useEffect(() => {
    async function postsOnMount() {
      setLoading(true);
      const query = firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .collection("posts")
        .orderBy("createdAt", "desc")
        .limit(Limit);

      const newPosts = (await query.get()).docs.map((doc) => doc.data());
      setPosts(posts.concat(newPosts));
      setLoading(false);
    }
    postsOnMount();
  }, []);

  return (
    <>
      <h1>Edit Previous Posts</h1>
      <PostFeed posts={posts} admin />
      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load More</button>
      )}
      <Loader show={loading} />

      {postsEnd && "There is no more to show."}
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");

  const slug = encodeURI(kebabCase(title));

  const ref: any = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("posts");
  const [querySnapshot] = useCollection(ref);
  const posts = querySnapshot?.docs.map((doc) => doc.data()?.slug);

  const dupSlug = posts?.includes(slug);
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
    toast.success("Post Created");
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
          <strong>slug: {slug} </strong>{" "}
          <strong className="text-danger">
            {" "}
            {dupSlug ? "*Duplicated Slug*" : null}
          </strong>
        </p>
        <button
          type="submit"
          disabled={!isValid || dupSlug}
          className="btn-green"
        >
          Create New Post
        </button>
      </form>
    </>
  );
}

export default AdminPostsPage;
