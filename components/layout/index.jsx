import { useRouter } from "next/router";

import Footer from "./Footer";
import Header from "./Header";
import Nav from "./Nav";

import styled from "styled-components";
import Background from "components/decorations/background";
import { toPascalCase } from "utils";

const MainLayout = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const MainContentWrapper = styled.main``;

export default function Index({ children }) {
  const router = useRouter();
  const currentPage = toPascalCase(router.pathname.replace("/", ""));
  return (
    <MainLayout className="layout">
      <Header componentName={currentPage} />
      <MainContentWrapper>{children}</MainContentWrapper>
      <Footer />
      <Background />
      <Nav currentPage={currentPage} />
    </MainLayout>
  );
}
