import React from 'react';
import s from './Dialogs.module.css';
import {DialogItem} from "./DialogItem/DialogItem";
import {Message} from "./Message/Message";
import { Navigate } from "react-router-dom";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/formsControls/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLenght50 = maxLengthCreator(50)

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'message'} component={Textarea} validate={[required, maxLenght50]}/>
        <div><button>Add message</button></div>
      </div>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm)


export const Dialogs = (props) => {


  let dialogsElement = props.dialogsPage.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>)
  let messagesElement = props.dialogsPage.messages.map(message => <Message key={message.id} message={message.message}/>)

  // const onMessageChange = e => {
  //   let value = e.target.value
  //   props.updateMessage(value)
  // }

  // const onSendMessageClick = () => {
  //   props.sendMessage()
  // }

  const addNewMessage = (value) => {
    props.sendMessage(value.message)
    // props.sendMessage(prop)
  }

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>
        {dialogsElement}
      </div>
      <div className={s.messages}>
        {messagesElement}
        <div>
          <AddMessageFormRedux onSubmit={addNewMessage}/>
          {/*<div><textarea onChange={onMessageChange} value={props.dialogsPage.newMessageBody}/></div>*/}
          {/*<div>*/}
          {/*  <button onClick={onSendMessageClick}>Add message</button>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

