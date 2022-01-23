import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { firestore, fromMillis, postToJson } from "../lib/firebase";
import { useState } from "react";
import PostFeed from "../components/PostFeed";

// Most post to query per page;
const Limit = 5;

export async function getServerSideProps() {
  const postQuery = firestore
    // connect all nested collentions
    .collectionGroup("posts")
    .where("published", "==", true)
    .orderBy("createdAt", "desc")
    .limit(Limit);

  const posts = (await postQuery.get()).docs.map(postToJson);

  return {
    props: { posts },
  };
}

export default function Home(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  async function getMorePosts() {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup("posts")
      .where("published", "==", true)
      .orderBy("createdAt", "desc")
      .startAfter(cursor)
      .limit(Limit);

    const newPosts = (await query.get()).docs.map(doc => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < Limit) {
      setPostsEnd(true);
    }
  }

  return (
    <main>
      <PostFeed posts={posts} />

      {!loading && !postsEnd && (
        <button onClick={getMorePosts}>Load More</button>
      )}

      <Loader show={loading} />

      {postsEnd && "There is no more to show."}
    </main>
  );
}
