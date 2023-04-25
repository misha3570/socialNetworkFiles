import React from 'react';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPostsContainer} from "./MyPosts/MyPostsContainer";
import {Preloader} from "../common/preloader/Preloader";

export const Profile = (props) => {
  // if(!props.profile) {
  //   return <><Preloader /></>
  // }
  return (
    <div>
      <ProfileInfo savePhoto={props.savePhoto}
                   isOwner={props.isOwner}
                   profile={props.profile}
                   status={props.status}
                   updateStatus={props.updateStatus}
                   saveProfile={props.saveProfile}
      />
      <MyPostsContainer/>
    </div>
  );
};

