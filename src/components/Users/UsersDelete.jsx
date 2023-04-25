import React from 'react';
import s from './Users.module.css';
import axios from "axios";
import userPhoto from '../../assets/images/no-avatar.webp'

export const UsersDelete = (props) => {
  if (props.users.length === 0) {
    axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
      console.log(response.data.items)
      props.setUsers(response.data.items)
    })

    // props.setUsers([
    //   {
    //     id: 1,
    //     followed: true,
    //     photoUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/44906d04-547a-45ef-a232-1b2e41d6b5df/360',
    //     fullName: 'Misha',
    //     status: 'i am programing',
    //     location: {city: 'kemerovo', country: 'Russia'}
    //   },
    //   {
    //     id: 2,
    //     followed: true,
    //     photoUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/44906d04-547a-45ef-a232-1b2e41d6b5df/360',
    //     fullName: 'Egor',
    //     status: 'i am CEO',
    //     location: {city: 'kazax', country: 'world'}
    //   },
    //   {
    //     id: 3,
    //     followed: false,
    //     photoUrl: 'https://avatars.mds.yandex.net/get-kinopoisk-image/1599028/44906d04-547a-45ef-a232-1b2e41d6b5df/360',
    //     fullName: 'Vova',
    //     status: 'I am the owner of the world ',
    //     location: {city: 'longon', country: 'anglia'}
    //   }
    //   ]
    // )
  }


  return (
    <div>
      {props.users.map(u => {
        return (
          <div key={u.id}>
        <span>
          <div>
            <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.photoUrl}/>
          </div>
          <div>
            {u.followed
              ? <button onClick={() => {
                props.unfollow(u.id)
              }}>Unfolow</button>
              : <button onClick={() => {
                props.follow(u.id)
              }}>Follow</button>
            }
          </div>
        </span>
            <span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
          <span>
            <div>{'u.location.city'}</div>
            <div>{'u.location.country'}</div>
          </span>
        </span>
          </div>
        )
      })}
    </div>
  );
};

