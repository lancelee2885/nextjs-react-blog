import "../styles/globals.scss";

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
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }} />
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
