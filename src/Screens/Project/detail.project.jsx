import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchProjectById, updateProjectById, updateProjectThumb } from '../../redux/async-actions/project.action'
import {
   FormGroup, FormControl,
   FormHelperText, TextField, Grid, Button
} from '@material-ui/core'
import ImageUploadComponent from '../../components/ImageUpload'
import RichTextEditor from '../../components/RichTextEditor'
import { domain } from '../../services/baseURL.services'


const DetailProject = () => {

   const { projectId } = useParams()


   const dispatch = useDispatch()
   const history = useHistory()
   const project = useSelector(state => state.project.projectById)
   const [title, setTitle] = useState('')
   const [isValid, setIsValid] = useState(true)
   const [thumb, setThumb] = useState([])
   const [isThumbValid, setIsThumbValid] = useState(false)
   const contentRef = useRef(null)


   useEffect(() => {
      dispatch(fetchProjectById(projectId))
   }, [dispatch, projectId])


   useEffect(() => {
      let result = []
      if (project?.projectThumb) {
         result.push({ 'data_url': domain + '/' + project.projectThumb })
         setThumb(result)
      }
   }, [project])


   const getContentFromRTE = (value) => {
      contentRef.current = value
      validateProjectForm()
   }
   const handleTitleChange = (e) => {
      setTitle(e.target.value)
   }
   const validateProjectForm = () => {
      if (title !== '' || contentRef.current !== project.content) return setIsValid(true)
      else if (contentRef.current === '' || title.length === 0) return setIsValid(false)
      return setIsValid(false)
   }
   const handleUpdateProject = () => {
      if (isValid) {
         updateProjectById(projectId, { title: title, content: contentRef.current }, history)
      }
      return 
   }

   const validateProjectThumb = () => {
      if (thumb.length === 0) return setIsThumbValid(false)
      return setIsThumbValid(true)
   }
   const handleFile = (imageList) => {
      setThumb(imageList)
      validateProjectThumb()
   }


   const handleUpdateProjectThumb = () => {
      let _formData = new FormData()
      _formData.append('projectThumb', thumb[0].file)
      updateProjectThumb(projectId,_formData, history)
   }








   return project && (<Grid container>
      <Grid item md={6}>
         <FormGroup style={{ border: "1px dotted #535c68", padding: "1rem 1.5rem" }}>
            <FormControl name='title'>
               <FormHelperText>Nhập tiêu đề bài viết</FormHelperText>
               <TextField defaultValue={project.title} variant="outlined" label="Tiêu đề" onChange={handleTitleChange} onBlur={validateProjectForm} />
            </FormControl>

            <FormControl fullWidth>
               <FormHelperText>Nhập nội dung bài viết</FormHelperText>
               <RichTextEditor getContentFromRTE={getContentFromRTE} defaultValue={project.content} />
            </FormControl>

            <FormControl onClick={handleUpdateProject}>
               <Button disabled={!isValid} style={{ marginTop: "2rem" }} color="primary" variant="contained" > Lưu bài viết</Button>
            </FormControl>
         </FormGroup>
      </Grid>
      <Grid item md={6}>
         <FormGroup style={{ border: "1px dotted #535c68", padding: "1rem 1.5rem" }}>
            <FormControl fullWidth>
               <FormHelperText> Chọn ảnh tiêu đề bài viết </FormHelperText>
               <FormHelperText> * Chỉ được chọn 1 ảnh</FormHelperText>
               <ImageUploadComponent maxNumber={1} isMultiple={false} handleFile={handleFile} imageList={thumb} />
            </FormControl>
            <FormControl>
               <Button disabled={!isThumbValid} variant="contained" color="primary" onClick={handleUpdateProjectThumb}>Lưu ảnh tiêu đề</Button>
            </FormControl>
         </FormGroup>
      </Grid>
   </Grid >
   )
}

export default DetailProject