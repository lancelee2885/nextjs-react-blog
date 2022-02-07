import styles from "../../styles/Post.module.css";
import Link from "next/link";
import {
  auth,
  firestore,
  getUserWithUsername,
  postToJson,
} from "../../lib/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import PostContent from "../../components/PostContent";
import AuthCheck from "../../components/AuthCheck";
import HeartBtn from "../../components/HeartBtn";

/** ISR - incremental static regeneration
 * This page is statically generated,
 * BUT regenerated after new requests come in at an interval of 5000ms.
 * If a prerendered page does not exist, will fallback to regular SSR.
 *
 * Benefits include better performace, fewer db queries, and keeps data current
 */

/**
 * tells nextjs to fetch data on the server at built time in order to prerender page in advance
 *
 * @param param0 { username, slug }
 */
export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection("posts").doc(slug);
    post = postToJson(await postRef.get());
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000, // tell next to regen the page when new request come in every 5000 ms
  };
}

/**
 * tells next which path to render
 * @returns
 */
export async function getStaticPaths() {
  const snapshot = await firestore.collectionGroup("posts").get();
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    // must be this format:
    // path = [{
    //     params: { username, slug}
    // }]
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData(postRef);
  const currUid = auth.currentUser?.uid;

  const post = realtimePost || props.post;
  const postUid = post?.uid;

  return (
    <main className={styles.container}>
      <section>
        <PostContent post={post} />
      </section>

      <aside className="card">
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>
        <AuthCheck
          fallback={
            <>
              <p> Like this post? Sign up now to give it a heart! </p>
              <Link href="/enter">
                <button>Sign up</button>
              </Link>
            </>
          }
        >
          <HeartBtn postRef={postRef} />
          {currUid == postUid ? (
            <Link href={`/admin/${post.slug}`}>
              <h3>
                <button className="btn-blue">Edit</button>
              </h3>
            </Link>
          ) : null}
        </AuthCheck>
      </aside>
    </main>
  );
}
