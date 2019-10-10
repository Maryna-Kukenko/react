import { combineReducers} from "redux";
import list from './Products/reducers';

export default combineReducers({
  productsList: list
})