import React from 'react';
import s from "./Users.module.css";
import userPhoto from "../../assets/images/no-avatar.webp";
import {NavLink} from "react-router-dom";


const User = ({user, followingInProgress, unFollow, follow}) => {
  return (
    <div>
        <span>
          <div>
            <NavLink to={'/profile/' + user.id}>
              <img src={user.photos.small != null ? user.photos.small : userPhoto} className={s.photoUrl}/>
            </NavLink>
          </div>
          <div>
            {user.followed
              ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                unFollow(user.id)
              }}>Unfolow</button>
              : <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => {
                follow(user.id)
              }}>Follow</button>
            }
          </div>
        </span>
            <span>
          <span>
            <div>{user.name}</div>
            <div>{user.status}</div>
          </span>
          <span>
            <div>{'u.location.city'}</div>
            <div>{'u.location.country'}</div>
          </span>
        </span>
          </div>

  );
};

export default User;