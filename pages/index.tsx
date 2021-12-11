import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Loader from '../components/Loader'
import toast from 'react-hot-toast'

export default function Home() {
  return (
    <main>
      <Loader show={true} />
      <Link 
        prefetch={true}
        href={{
          pathname: '/[username]',
          query: {username: 'lancelee'}
        }}>
        Lance's Profile
      </Link>
      <button onClick={() => toast.success('helle toast')}>Toast Me</button>
    </main>
  )
}
