import { useState } from "react";
import { Link } from "@tanstack/react-location";

import styled from "styled-components";
import { darkTheme } from "styles/Theme";

import pdi1 from "assets/profile-default-imgs/1.png";
import pdi2 from "assets/profile-default-imgs/2.png";
import pdi3 from "assets/profile-default-imgs/3.jpg";
import pdi4 from "assets/profile-default-imgs/4.png";
import pdi5 from "assets/profile-default-imgs/5.jpg";
import pdi6 from "assets/profile-default-imgs/6.jpg";

import { UserType } from "pages/social";

import Card from "components/commons/Card";

type PropsType = {
  isDisplayMyFriends: boolean;
} & UserType;

function SocialItem(props: PropsType) {
  const { profileImg, nickname, email, curPos, status, isDisplayMyFriends } =
    props;

  const profiles = [pdi1, pdi2, pdi3, pdi4, pdi5, pdi6];
  const [isDisplayOption, setIsDisplayOption] = useState(false);

  return (
    <SocialCard>
      <Status>
        <ProfileImg src={profiles[profileImg]} />
        <UserInfo>
          <Nickname>{nickname}</Nickname>
          <Email>{email}</Email>
          <CurrentPos>{curPos}</CurrentPos>
        </UserInfo>
      </Status>
      <div>
        <MenuIcon
          onClick={() => {
            setIsDisplayOption(!isDisplayOption);
          }}
          className="fa-solid fa-ellipsis-vertical"
        ></MenuIcon>
        {isDisplayMyFriends && isDisplayOption && (
          <Menu>
            <Link
              to={curPos}
              onClick={() => {
                setIsDisplayOption(!isDisplayOption);
              }}
            >
              <p>친구 따라가기</p>
            </Link>
          </Menu>
        )}
        {!isDisplayMyFriends && isDisplayOption && (
          <Menu>
            <div>
              <p>요청 승낙</p>
            </div>
            <Hr />
            <div>
              <p style={{ color: `${darkTheme.adaptiveGrey200}` }}>거절</p>
            </div>
          </Menu>
        )}
      </div>
    </SocialCard>
  );
}

const SocialCard = styled(Card)`
  display: flex;
  justify-content: space-between;
  background-color: ${darkTheme.mainColor};
  max-width: 100%;
`;
const Status = styled.div`
  display: flex;
`;
const ProfileImg = styled.img`
  width: 5rem;
  border-radius: 5rem;
  margin: 1.5rem 0 1.5rem 1.5rem;
`;
const UserInfo = styled.div`
  align-self: center;
  margin: 0 0 0 2rem;
`;
const Nickname = styled.h1`
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
`;
const Email = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  color: ${darkTheme.adaptiveGrey700};
  margin-bottom: 0.4rem;
`;
const CurrentPos = styled.span`
  font-size: 1rem;
  color: ${darkTheme.adaptiveGrey500};
`;
const MenuIcon = styled.i`
  width: 1rem;
  margin: 1rem 1rem 0 0;
  text-align: center;

  &:hover {
    cursor: pointer;
    color: ${darkTheme.adaptiveGrey200};
  }
`;
const Menu = styled.div`
  width: 9rem;
  background-color: ${darkTheme.darkColor};
  transform: translate(-50%, 0);
  position: absolute;
  margin-top: 0.3rem;
  border-radius: 4px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;

  a,
  div {
    display: flex;
    align-items: center;
    width: 100%;
    height: 3rem;

    p {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 60%;

      &:hover {
        cursor: pointer;
        background-color: ${darkTheme.adaptiveGrey500};
      }
    }
  }
`;
const Hr = styled.hr`
  border: 1px solid ${darkTheme.adaptiveGrey800};
  background-color: ${darkTheme.adaptiveGrey800};
  width: 100%;
  margin: 0;
`;

export default SocialItem;
