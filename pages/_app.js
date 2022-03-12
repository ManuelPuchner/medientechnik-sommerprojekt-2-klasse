import Layout from "components/layout"

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const componentName = Component.displayName || Component.name || "Component"
  return (
    <Layout {...pageProps} componentName={componentName}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp
