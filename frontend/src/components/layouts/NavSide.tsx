import { NavLink } from "react-router-dom";

import styled from "styled-components";
import { letterSpacingSize } from "styles/GlobalStyle";
import { darkTheme } from "styles/Theme";

const { adaptiveGrey200, adaptiveGrey800, adaptiveGrey700, bgColor } =
  darkTheme;
const NavSide = () => {
  return (
    <Side>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <Logo>hool!</Logo>
      </NavLink>
      <ButtonGroup>
        <NavLink to="/">
          <Btn>
            <Icon className="fa-solid fa-list" />
          </Btn>
        </NavLink>
        <Btn>
          <Icon className="fa-solid fa-users" />
        </Btn>
        <Btn>
          <Icon className="fa-solid fa-face-grin-wide" />
        </Btn>
        <Btn>
          <Icon className="fa-solid fa-gear" />
        </Btn>
      </ButtonGroup>
    </Side>
  );
};
const Side = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 5;
  margin: 0 auto;
  height: 100vh;
  width: 3rem;
  background-color: ${bgColor};
`;
const Logo = styled.h1`
  font-family: "Lobster", cursive;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 3.5rem;

  &:hover {
    cursor: pointer;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
const Btn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  background-color: ${adaptiveGrey800};
  margin: 0 0 1.75rem 0;
  cursor: pointer;

  &:hover {
    background-color: ${adaptiveGrey700};
  }
`;
const Icon = styled.i`
  font-size: 1rem;
  color: ${adaptiveGrey200};
  margin: 0 ${letterSpacingSize}rem 0 0;
`;

export default NavSide;
