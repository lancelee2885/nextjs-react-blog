import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import MetaTags from './MetaTags';

// UI component for main post content
export default function PostContent({ post }) {
  const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

  return (
    <div className="card">
      <MetaTags title={post?.title} description={post?.content} image={null}/>
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </Link>{' '}
        on {createdAt.toString()}
      </span>
      <div
          className="card"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        ></div>
    </div>
  );
}