import { combineReducers } from "redux"
import userReducer from "./user.reducer"
import brandReducer from "./brand.reducer"
import categoryReducer from "./category.reducer"
import productReducer from "./products.reducer"
import projectReducer from './project.reducer'

const rootReducer = combineReducers({
  user: userReducer,
  brand: brandReducer,
  category: categoryReducer,
  product: productReducer,
  project: projectReducer
})
export default rootReducer
