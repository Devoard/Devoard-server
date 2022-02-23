import { combineReducers } from "redux";
import user from './user';
import chat from './chat';
import survey from './servey'
const rootReducer = combineReducers({
  user, chat, survey
})
export default rootReducer;