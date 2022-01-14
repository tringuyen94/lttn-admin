import { toast } from 'react-toastify'
import ProjectServices from '../../services/project.services'
import { DELETE_PROJECT_BY_ID, FETCH_PROJECTS, FETCH_PROJECT_BY_ID, FILTER_PROJECTS } from './actionType'

export const createProject = (projectData, history) => {
   ProjectServices.createProject(projectData)
      .then(res => {
         history.push('/projects')
         toast.success('Đã tạo thành công')
      })
      .catch(err => toast(err.response.data))
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
         .catch(err => console.log(err.response.data.message))
   }
}


export const updateProjectById=(projectId,updateValue,history)=>{
   ProjectServices.updateProjectById(projectId,updateValue)
      .then(res=>{
         history.push('/projects')
         toast.success('Cập nhật thành công')
      })
      .catch(err=>toast.error(err.response.data.message))  
}

export const updateProjectThumb = (projectId,newThumb,history)=>{
   ProjectServices.updateProjectThumb(projectId,newThumb)
      .then(res=>{
         history.push('/projects')
         toast.success('Cập nhật thành công')
      })
      .catch(err => toast(err.response.data.message))
   }