import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/formsControls/FormsControls";

const maxLength10 = maxLengthCreator(10)

const AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'newPostText'} component={Textarea} validate={[required, maxLength10]}/>
        {/*<textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>*/}
      </div>
      <button
        // onClick={addPost}
        // onClick={onSubmit}
      >Add post</button>
    </form>
  )
}

const AddNewPostFormRedux = reduxForm({form: 'profileAddNewPostForm'})(AddNewPostForm)

export const MyPosts = React.memo((props) => {
  // shouldComponentUpdate(nextProps, nextState) {
// return nextProps !== this.props || nextState != this.state
// }
// вроде как но не точно
// при передаче всего стейта эта компонента будет рендериться 3 раза и
// shouldComponentUpdata может это предотвратить она будет проверять
// нужно ли рендерить или нет но есть еще более короткий способ
// это сделать не React.Component а React.PureComponent
// React.memo делает то же самое что и описаное выше
  let postsElement = props.posts.map(p => <Post message={p.message} key={p.id} like={p.likeCount}/>)

  const addPost = (value) => {
    props.addPost(value.newPostText)
  }

  return (
    <div className={s.postBlock}>
      My post
      <div>
        <AddNewPostFormRedux onSubmit={addPost}/>
      </div>
      <div className={s.posts}>
        {postsElement}
      </div>
    </div>
  );
});

