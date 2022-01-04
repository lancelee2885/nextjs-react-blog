import PostFeed from "../../components/PostFeed";
import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, postToJson } from "../../lib/firebase";

export async function getServerSideProps({ query }){
    const { username } = query;
    
    const userDoc = await getUserWithUsername(username);

    // JSON serialized Data
    let user;
    let posts;

    if (userDoc) {
        user = userDoc.data();
        const postQuery = userDoc.ref
            .collection('posts')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .limit(5);

        posts = (await postQuery.get()).docs.map(postToJson);
    }

    return {
        props: { user, posts },
    };
}

function UserPage({user, posts}) {
    return ( 
        <main>
            <UserProfile user={user} />
            <PostFeed posts={posts} />
        </main>
     );
}

export default UserPage;