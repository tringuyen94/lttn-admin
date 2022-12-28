import React from 'react'

import {
   Grid, Card, CardActions,
   CardContent, CardMedia, Typography, IconButton
} from '@material-ui/core'
import { Delete, Edit } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'
import { domain } from '../../services/baseURL.services'

const ProjectItem = ({ project, handleDeleteProject }) => {
   const history = useHistory()
   const { pathname } = useLocation()
   return (
      <Grid item md={4} sm={6} xs={12} className='project__item'>
         <Card>
            <CardMedia
               component="img"
               height="140px"
               image={project.projectThumb[0].url}
               alt="project"
            />
            <CardContent>
               <Typography
                  gutterBottom
                  variant="h5"
                  component="div">
                  {project.title.slice(0, 40) + "..."}
               </Typography>
            </CardContent>
            <CardActions >
               <IconButton
                  color="primary"
                  onClick={() => history.push(`${pathname}/update-project/${project._id}`)}>
                  <Edit />
               </IconButton>
               <IconButton
                  color="secondary"
                  onClick={() => handleDeleteProject(project._id)}>
                  <Delete />
               </IconButton>
            </CardActions>
         </Card>
      </Grid >
   )
}

export default ProjectItem