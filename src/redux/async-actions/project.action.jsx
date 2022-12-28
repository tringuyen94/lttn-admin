import { toast } from 'react-toastify'
import ProjectServices from '../../services/project.services'
import { ADD_PROJECT, DELETE_PROJECT_BY_ID, FETCH_PROJECTS, FETCH_PROJECT_BY_ID, FILTER_PROJECTS, LOADING_PROJECTS, UPDATE_PROJECT } from './actionType'





export const createProject = (projectData, history) => {
   return dispatch => {
      dispatch({ type: LOADING_PROJECTS })
      ProjectServices.createProject(projectData)
         .then(res => {
            dispatch({ type: ADD_PROJECT })
            toast.success(res.data.message)
            history.push('/projects')
         })
         .catch(err => toast.error(err.response.data))
   }

}

export const fetchProjects = () => {
   return dispatch => {
      ProjectServices.fetchProjects()
         .then(res => dispatch({ type: FETCH_PROJECTS, payload: res.data }))
         .catch(err => toast.error('Đã có lỗi xảy ra'))
   }
}
export const fetchProjectById = (projectId) => {
   return dispatch => {
      ProjectServices.fetchProjectById(projectId)
         .then(res => dispatch({ type: FETCH_PROJECT_BY_ID, payload: res.data }))
         .catch(err => toast.error(err.response.data.message))
   }
}
export const filterProject = (searchTerm) => {
   return dispatch => dispatch({ type: FILTER_PROJECTS, payload: searchTerm })
}

export const deleteProjectById = (projectId) => {
   return dispatch => {
      ProjectServices.deleteProjectById(projectId)
         .then(res => {
            dispatch({ type: DELETE_PROJECT_BY_ID, payload: projectId })
            toast.success(res.data.message)
         })
         .catch(err => toast.error(err.response.data.message))
   }
}


export const updateProjectById = (projectId, updateValue, history) => {
   return dispatch => {
      dispatch({ type: LOADING_PROJECTS })
      ProjectServices.updateProjectById(projectId, updateValue)
         .then(res => {
            dispatch({ type: UPDATE_PROJECT })
            toast.success(res.data.message)
            history.push('/projects')
         })
         .catch(err => toast.error(err.response.data.message))
   }

}
