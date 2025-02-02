import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.main`
  margin: 1em;
  margin-top: 2em;
`;

export const HeaderContainer = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #1A1A1A;
  z-index: 2;
`;

export const Header = styled.div`
  margin: auto;
  max-width: 90em;
  padding: 0 2em;
  width: 100%;
  height: 5em;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    gap: 0.8em;
  }
`

export const Links = styled.div`
  display: flex;
  gap: 0.5em;
  align-items: center;
  a {
    color: #adadad;
    text-decoration: none;
    transition: transform 0.3s ease-in-out;
    transform: translateY(0px);
    padding: 1em 0.2em 0 0.2em;
    &:hover {
      color: white;
      transform: translateY(5px);
    }
  }
`;

export const HeaderLogo = styled(Link)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
`;