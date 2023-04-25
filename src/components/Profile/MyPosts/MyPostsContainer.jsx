import React from 'react';
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profileReducer";
import {MyPosts} from "./MyPosts";
import {connect} from "react-redux";


// export const MyPostsContainer = () => {
//   return (
//     <StoreContext.Consumer>
//       {
//       (store) => {
//         let state = store.getState()
//
//         let addPost = () => {
//           store.dispatch(addPostActionCreator())
//         }
//
//         let onPostChange = text => {
//           store.dispatch(updateNewPostTextActionCreator(text))
//         }
//
//         return <MyPosts
//           updateNewPostText={onPostChange}
//           addPost={addPost}
//           posts={state.profilePage.posts}
//           newPostText={state.profilePage.newPostText}
//         />}}
//     </StoreContext.Consumer>)
// };

const mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateNewPostText: text => dispatch(updateNewPostTextActionCreator(text)),
//     addPost: (value) => dispatch(addPostActionCreator(value))
//   }
// }


export const MyPostsContainer = connect(mapStateToProps, {addPost: addPostActionCreator})(MyPosts)

