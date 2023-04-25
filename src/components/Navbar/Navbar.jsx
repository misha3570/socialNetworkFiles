import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

export const Navbar = () => {

  const isActive = (bool) => {
    return bool ? s.active : s.item
  }

  return (
    <nav className={s.nav}>
      <div className={s.item}>
        <NavLink
          to='/profile'
          className = { navData => isActive(navData.isActive) }
        >Profile</NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to='/dialogs'
          className = { navData => isActive(navData.isActive) }
        >Messages</NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to='/users'
          className = {navData => isActive(navData.isActive)}
        >Users</NavLink>
      </div>
      <div className={s.item}>
        <NavLink
          to='/settings'
          className={navData => isActive(navData.isActive)}
        >Settings</NavLink>
      </div>
    </nav>
  );
};
