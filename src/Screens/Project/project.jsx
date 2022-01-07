import { Grid, InputAdornment, FormControl, InputLabel, OutlinedInput, Container } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import React, { Fragment, useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { deleteProjectById, fetchProjects, filterProject } from '../../redux/async-actions/project.action'
import ProjectItem from './item.project'
import './project.css'

const Project = () => {
   const projects = useSelector(state => state.project.projects)
   const dispatch = useDispatch()
   const typingTimeOutRef = useRef(null)
   const [searchTerm, setSearchTerm] = useState()

   const handleSearch = (e) => {
      let value = e.target.value
      setSearchTerm(value)
      if (typingTimeOutRef.current) {
         clearTimeout(typingTimeOutRef.current)
      }
      typingTimeOutRef.current = setTimeout(() => {
         if (value === '') return dispatch(fetchProjects())
         dispatch(filterProject(value))
      }, 500)
   }

   const handleDeleteProject = (projectId) => {
      dispatch(deleteProjectById(projectId))
   }

   useEffect(() => {
      dispatch(fetchProjects())
   }, [dispatch])

   return (
      <Fragment>
         <div className='project__filterbar'>
            <FormControl sx={{ m: 1, width: '25ch' }} onChange={handleSearch} md={{ width: '5rem ' }} variant="outlined">
               <InputLabel htmlFor="outlined-adornment-password">Tìm kiếm bài viết...</InputLabel>
               <OutlinedInput
                  id="outlined-adornment-password"
                  endAdornment={
                     <InputAdornment position="end">
                        <Search />
                     </InputAdornment>
                  }
                  label="Password"
               />
            </FormControl>
         </div>
         <Grid container className='project__posts' justify='space-evenly'>
            {projects && projects.map(project => <ProjectItem handleDeleteProject={handleDeleteProject}
               project={project} key={project._id} />)}
         </Grid>
      </Fragment>
   )
}

export default Project