import React from 'react';
import ReactDOM from 'react-dom';
import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";

let state = {
  posts: [
    {id: 1, message: 'Hi, how are you?', likeCount: 15},
    {id: 2, message: 'it my first post', likeCount: 20},
  ]
}

test('length of posts should be incremented', () => {
  let action = addPostActionCreator('it-')
  let newState =  profileReducer(state, action)

  expect(newState.posts.length).toBe(3)
});

test('message of new post should be it-kamasutra ', () => {
  let action = addPostActionCreator('it-')
  let newState =  profileReducer(state, action)

  expect(newState.posts[1].message).toBe('it my first post')
});

test('after deleting length of messages should be decrement', () => {
  let action = deletePost(1)
  let newState =  profileReducer(state, action)
  expect(newState.posts.length).toBe(1)
});


