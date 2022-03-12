import Footer from './Footer';
import Header from './Header';
import Nav from './Nav';

import styled from "styled-components"
import Background from 'components/decorations/background';


const MainLayout = styled.div`

`

const MainContentWrapper = styled.main`

`

export default function index({ children, componentName }) {
  return (
    <MainLayout className="layout">
      <Header componentName={componentName} />
      <MainContentWrapper>{children}</MainContentWrapper>
      <Footer />
      <Background />
      <Nav currentPage={componentName} />
    </MainLayout>
  );
}
