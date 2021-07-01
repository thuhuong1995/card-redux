import * as types from "../const/ActionTypes";
import * as Message from "../const/Message";

const initialState = Message.MSG_WELLCOME;

const message = (state = initialState, action) => {
    switch (action.type) {
        case types.CHANGE_MESSAGE:
            return action.message
        default: return [...state];
    }

}

export default message;