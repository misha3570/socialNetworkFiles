import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

export const Header = (props) => {
  return (
    <header className={s.header}>
      <img
        src='https://cdn.dribbble.com/userupload/3158902/file/original-7c71bfa677e61dea61bc2acd59158d32.jpg?resize=400x0'/>
      <div className={s.loginBlock}>
        {props.isAuth
          ? <div>{props.login} - <button
            onClick={props.logout}
          >Log out</button></div>
          : <NavLink to={'/login'}>Login</NavLink>
        }
      </div>
    </header>
  );
};

