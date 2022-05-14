import Layout from "components/layout";
import AuthWrapper from "components/AuthWrapper";
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "stores/Cart";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <CartContextProvider>
        <Layout {...pageProps}>
          <AuthWrapper>
            <Component {...pageProps} />
          </AuthWrapper>
        </Layout>
      </CartContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
