import React from "react";
import styled from "styled-components";
import { fontStyles, colors } from "../../styles";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Nav = styled.nav`
  background: #000;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

const Title = styled.h1`
  font-family: ${fontStyles.title};
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 10px 22px;
  height: 100%;
  cursor: pointer;
  margin-left: 3px;
  margin-right: 3px;

  &.active {
    color: ${colors.green};
  }
`;

const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    curosr: pointer;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #256cel;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 3px;
  margin-right: 3px;
  font-family: ${fontStyles.subtitle};
  font-size: 14px;

  &.active {
    color: ${colors.green};
  }
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: ${colors.green};
  }
`;

const LogOutButton = styled(Link)`
  border-radius: 4px;
  background: #256cel;
  padding: 10px 22px;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 3px;
  margin-right: 3px;
  font-family: ${fontStyles.subtitle};
  font-size: 14px;

  &:hover {
    transition: all 0.2s ease-int-out;
    background: #fff;
    color: ${colors.green};
  }
`;

export default function NavBar(props) {
  const logOut = async () => {
    await window.localStorage.setItem('access_token', '');
    window.location.reload(true);
  }

  return (
    <Nav>
      <NavLink to="./">
        <Title>Spotify Album Radar</Title>
      </NavLink>
      <Bars />
      <NavMenu>
        <NavBtnLink to="/about">
          About
        </NavBtnLink>
        <NavBtnLink to="/profile">Profile Management</NavBtnLink>
        <LogOutButton active={props.token} to="/" onClick={() => logOut()}>Log Out</LogOutButton>
      </NavMenu>
    </Nav>
  );
}
