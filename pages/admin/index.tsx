import Head from 'next/head';
import AuthCheck from '../../components/AuthCheck';

function AdminPostsPage({  }) {
    return ( 
        <main>
            <AuthCheck>
                <p>Post</p>
            </AuthCheck>
        </main>
     );
}

export default AdminPostsPage;