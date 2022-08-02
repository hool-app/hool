import { Link } from "@tanstack/react-location";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

const { adaptiveGrey200, adaptiveGrey800, adaptiveGrey700, bgColor } =
  darkTheme;

const NavSide = () => {
  return (
    <Side>
      <NavLink to="/">
        <Logo>hool!</Logo>
      </NavLink>
      <ButtonGroup>
        <NavLink to="/meeting">
          <Btn>
            <Icon className="fa-solid fa-list" />
          </Btn>
        </NavLink>
        <NavLink to="/social">
          <Btn>
            <Icon className="fa-solid fa-users" />
          </Btn>
        </NavLink>
        <NavLink to={"/market"}>
          <Btn>
            <Icon className="fa-solid fa-face-grin-wide" />
          </Btn>
        </NavLink>
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
  z-index: 5;
  margin: 0 auto;
  height: 100vh;
  width: 3rem;
  background-color: ${bgColor};
`;
const NavLink = styled(Link)`
  text-decoration: none;
  margin-bottom: 1.75rem;
`;
const Logo = styled.h1`
  font-family: "Lobster", cursive;
  font-size: 2rem;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3.5rem;
`;
const Btn = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 4px;
  background-color: ${adaptiveGrey800};
  cursor: pointer;

  &:hover {
    background-color: ${adaptiveGrey700};
  }
`;
const Icon = styled.span`
  font-size: 1rem;
  color: ${adaptiveGrey200};
`;

export default NavSide;
