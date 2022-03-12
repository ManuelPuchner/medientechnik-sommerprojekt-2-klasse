import styled from 'styled-components';
import Link from 'next/link';

const HeaderWrapper =  styled.header`
  padding: 2rem 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CompanyName = styled.h1`
  margin: 0;
  padding: 0;
`

const PageTitle = styled.h2`
  margin: 0;
  padding: 0;
`

export default function Header({componentName}) {
  return (
    <HeaderWrapper>
      <CompanyName>
        <Link href={'/'}>
          <a>MyShoes</a>
        </Link>
      </CompanyName>
      <PageTitle>{componentName}</PageTitle>
    </HeaderWrapper>
  );
}
