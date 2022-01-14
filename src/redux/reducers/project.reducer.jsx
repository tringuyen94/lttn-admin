import { DELETE_PROJECT_BY_ID, FETCH_PROJECTS, FETCH_PROJECT_BY_ID, FILTER_PROJECTS } from "../async-actions/actionType"

let initialState = {
   projects: null,
   projectById: null
}

const projectReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_PROJECTS:
         return { ...state, projects: action.payload }
      case FETCH_PROJECT_BY_ID:
         return { ...state, projectById: action.payload }
      case FILTER_PROJECTS:
         let resultFilter = state.projects.filter(project => project.slug.toLowerCase().includes(action.payload.toLowerCase()))
         return { ...state, projects: resultFilter }
      case DELETE_PROJECT_BY_ID:
         let resultArr = state.projects.filter(project => project._id !== action.payload)
         return { ...state, projects: resultArr }
      default:
         return state
   }
}

export default projectReducer