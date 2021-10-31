import '../styles/globals.css'

import { GetServerSideProps } from 'next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
