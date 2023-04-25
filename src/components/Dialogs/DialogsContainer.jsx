import React from 'react';
import {sendMessageActionCreator, updateNewMessageBodyActionCreator} from "../../redux/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";


let mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  }
}

// let mapDispatchToProps = (dispatch) => {
//   return {
//     updateMessage: text => {
//       dispatch(updateNewMessageBodyActionCreator(text))
//     },
//     sendMessage: (newMessageBody) => {
//       dispatch(sendMessageActionCreator(newMessageBody))
//     }
//   }
// }



// let AuthRedirectComponent = withAuthRedirect(Dialogs)


export default compose(
  connect(mapStateToProps, {sendMessage:sendMessageActionCreator}),
  withAuthRedirect,
)(Dialogs)

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)

