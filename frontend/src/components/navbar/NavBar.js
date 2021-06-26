import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Nav = styled.nav`
  background: #000;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1 rem;
  height: 100%;
  cursor: pointer;
  margin-left: 5px;
  margin-right: 5px;

  &.active {
    color: #1db954;
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
  margin-right: 24px;

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
  margin-left: 24px;

  &.active {
    color: #1db954;
  }
  // &:hover {
  //   transition: all 0.2s ease-int-out;
  //   background: #fff;
  //   color: #1db954;
  // }
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
  margin-left: 24px;

  &:hover {
    transition: all 0.2s ease-int-out;
    background: #fff;
    color: #1db954;
  }
`;

export default function NavBar() {
  const logOut = () => {
    window.localStorage.setItem('access_token', '');
  }

  return (
    <Nav>
      <NavLink to="./">
        <h1>Spotify Album Radar</h1>
      </NavLink>
      <Bars />
      <NavMenu>
        <NavLink to="/about">
          About
        </NavLink>
        <NavBtnLink to="/profile">Profile Management</NavBtnLink>
        <LogOutButton to="/LogOut">Log Out</LogOutButton>
      </NavMenu>
    </Nav>
  );
}
