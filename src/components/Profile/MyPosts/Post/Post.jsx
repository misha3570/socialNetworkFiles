import React from 'react';
import s from './Post.module.css';

export const Post = (props) => {
  return (
    <div className={s.item}>
      <img
        src='https://thumbs.dreamstime.com/b/businessman-icon-image-male-avatar-profile-vector-glasses-beard-hairstyle-179728610.jpg'/>
      {props.message}
      <div>
        <span>Like {props.like}</span>
      </div>
    </div>
  );
};

