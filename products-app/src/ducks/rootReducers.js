import { combineReducers} from "redux";
import reducers from './Products/reducers';

export default combineReducers({
 products: reducers[0]
})