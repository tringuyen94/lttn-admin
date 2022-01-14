import { restConnector } from "./baseURL.services"



class ProjectServices {
   createProject(projectData) {
      return restConnector({
         url: 'api/projects/create-project',
         method: 'POST',
         data: projectData
      })
   }
   fetchProjects() {
      return restConnector({
         url: 'api/projects/get-projects',
         method: "GET"
      })
   }
   fetchProjectById(projectId) {
      return restConnector({
         url: `api/projects/get-project-by-id/${projectId}`,
         method: "GET"
      })
   }
   deleteProjectById(projectId) {
      return restConnector({
         url: `api/projects/delete-project-by-id/${projectId}`,
         method: "DELETE"
      })
   }
   updateProjectById(projectId, updateValue) {
      return restConnector({
         url: `api/projects/update-project-by-id/${projectId}`,
         data: updateValue,
         method: "PUT"
      })
   }
   updateProjectThumb(projectId, newThumb) {
      return restConnector({
         url: `api/projects/update-project-thumb/${projectId}`,
         data: newThumb,
         method: "PUT"
      })
   }
}



export default new ProjectServices()