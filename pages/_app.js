import Layout from "components/layout";
import AuthWrapper from "components/AuthWrapper";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout {...pageProps}>
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
