import "../styles/globals.css";

import Head from "next/head";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import UserContext from "../lib/context";
import { useUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }) {

  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <Head>
        <title>Feed @ Lance</title>
        <meta property="og:title" content="Feed @ Lance" key="title" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
