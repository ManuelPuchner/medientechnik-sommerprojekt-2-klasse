import Footer from './Footer';
import Header from './Header';

import styled from "styled-components"


const MainLayout = styled.div`
  color: #f00;
`

const MainContentWrapper = styled.main`

`

export default function index({ children }) {
  return (
    <MainLayout>
      <Header />
      <MainContentWrapper>
        {children}
      </MainContentWrapper>
      <Footer />
    </MainLayout>
  )
}
