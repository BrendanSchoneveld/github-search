import styled, {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }`

export const Header = styled.header`
  width: 100vw;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #FFC917;
`

export const Main = styled.main`
  // the subtracted 200px is combined height of header and footer
  min-height: calc(100vh - 200px);
`

export const Footer = styled.footer`
  width: 100vw;
  height: 100px;
  background: #003082;
`
/*
* Basic layout styling for all pages
* */
export const PageLayoutWrapper = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
`
export const EmptyPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
  width: inherit;
`


