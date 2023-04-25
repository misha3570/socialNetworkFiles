// const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY'
const SEND_MESSAGE = 'SEND_MESSAGE'

let initialState = {
  dialogs: [
    {id: 1, name: 'Misha'},
    {id: 2, name: 'Dima'},
    {id: 3, name: 'Vlad'},
  ],
  messages: [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you'},
    {id: 3, message: 'Yo'}
  ],
}

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    // case UPDATE_NEW_MESSAGE_BODY:
    //   return {
    //     ...state,
    //     newMessageBody: action.payload
    //   }

    case SEND_MESSAGE:
      let body = action.newMessageBody
      return {
        ...state,
        messages: [...state.messages, {id: 4, message: body}],
      }
    default:
      return state
  }
}

export const sendMessageActionCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody})

// export const updateNewMessageBodyActionCreator = text => ({type: UPDATE_NEW_MESSAGE_BODY, payload: text})

export default dialogsReducer