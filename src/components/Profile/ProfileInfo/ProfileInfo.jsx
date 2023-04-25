import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import {ProfileStatusWithHooks} from "./ProfileStatusWithHooks";
import {Preloader} from "../../common/preloader/Preloader";
import userPhoto from '../../../assets/images/no-avatar.webp'
import ProfileDataForm from "./ProfileDataForm";

export const ProfileInfo = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {
  const [editMode, setEditMode] = useState(false)

  if (!profile) {
    return <Preloader/>
  }

  const mainPhotoSelected = e => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    saveProfile(formData)
      .then(() => {
        setEditMode(false)
      })
    // setEditMode(false)
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img className={s.avatarProfile} src={profile.photos.large || userPhoto}/>
        {isOwner && <input onChange={mainPhotoSelected} type='file'/>}
        {editMode
          ? <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmit}/>
          : <ProfileData goToEditMode={() => {setEditMode(true)}}  profile={profile} isOwner={isOwner}/>}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
      </div>
    </div>
  );
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
  return <>
    {isOwner && <div><button onClick={goToEditMode}>edit</button></div>}
    <div><b>Full name</b>:{profile.fullName}</div>
    <div>
      <div><b>Looking for a job</b>:{profile.lookingForAJob ? 'yes' : 'no'}</div>
      {profile.lookingForAJob &&
        <div><b>My professional skills</b>:{profile.lookingForAJobDeskription}</div>
      }
      <div><b>About me</b>:{profile.aboutMe}</div>
      <div><b>Contacts</b>:{Object.keys(profile.contacts).map(key => {
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
      })}</div>
    </div>
  </>
}


const Contact = ({contactTitle, contactValue}) => {
  return (
    <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
  )
}

