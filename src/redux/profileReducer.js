import {profileApi, usersApi} from "../api/api";
import {toggleFollowingProgress, unfollowSuccess} from "./usersReducer";
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST'
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT'
const SET_USER_PROFILE = 'SET_USER_PROFILE'
const SET_STATUS = 'SET_STATUS'
const DELETE_POST = 'DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS'

let initialState = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likeCount: 15},
    {id: 2, message: 'it my first post', likeCount: 20},
  ],
  // newPostText: 'it-kamasss',
  profile: null,
  status: ''
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let body = action.newPostText
      return {
        ...state,
        // newPostText: '',
        posts: [...state.posts, {id: 3, message: body, likeCount: 0}]
      }
    // case UPDATE_NEW_POST_TEXT:
    //   return {
    //     ...state,
    //     newPostText: action.payload
    //   }
    case SET_USER_PROFILE:
      return {
        ...state, profile: action.profile
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.id)
      }
      case SAVE_PHOTO_SUCCESS:
      return {
        ...state, profile: {...state.profile, photos: action.photos}}
    default:
      return state
  }
}

export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText})
export const setStatus = (status) => ({type: SET_STATUS, status})
export const deletePost = (id) => ({type: DELETE_POST, id})
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile})

// export const updateNewPostTextActionCreator = text =>
//   ({type: UPDATE_NEW_POST_TEXT, payload: text})

export const getUserProfile = (userId) => async (dispatch) => {
  let response = await usersApi.getProfile(userId)
  dispatch(setUserProfile(response.data))
}
export const getStatus = (userId) => async (dispatch) => {
  let response = await profileApi.getStatus(userId)
  dispatch(setStatus(response.data))
}
export const updateStatus = (status) => async (dispatch) => {
  // try {
    let response = await profileApi.updateStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  // } catch (error) {
  //   debugger
  //   console.log(error)
  // }
}

export const savePhoto = file => async (dispatch) => {
  let response = await profileApi.savePhoto(file)
  if(response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos))
  }
}
export const saveProfile = profile => async (dispatch, getState) => {
  const userId = getState().auth.userId
  console.log(profile)
  let response = await profileApi.saveProfile(profile)
  if(response.data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    dispatch(stopSubmit('editProfile', {_error: response.data.messages[0]}))
    return Promise.reject(response.data.messages[0])
    // Эта строчка для общих ошибок
    // dispatch(stopSubmit('editProfile', {'contacts': {'facebook': response.data.messages[0]}}))
    // эта для конкретного поля фейсбука
  }
}

export default profileReducer