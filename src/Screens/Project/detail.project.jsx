import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchProjectById, updateProjectById } from '../../redux/async-actions/project.action'
import {
   FormGroup, FormControl,
   FormHelperText, TextField,
   Grid, Button, CircularProgress
} from '@material-ui/core'
import ImageUploadComponent from '../../components/ImageUpload'
import RichTextEditor from '../../components/RichTextEditor'


const DetailProject = () => {

   const { projectId } = useParams()
   const history = useHistory()
   const dispatch = useDispatch()

   const project = useSelector(state => state.project.projectById)
   const loadingProj = useSelector(state => state.project.loading)

   const [title, setTitle] = useState('')
   const [isValid, setIsValid] = useState(false)
   const [thumb, setThumb] = useState([])

   const contentRef = useRef(null)

   useEffect(() => {
      dispatch(fetchProjectById(projectId))
   }, [dispatch, projectId])

   const getContentFromRTE = (value) => {
      contentRef.current = value
      validateProjectForm()
   }

   const handleTitleChange = (e) => {
      setTitle(e.target.value)
      validateProjectForm()
   }

   const validateProjectForm = () => {
      if (contentRef.current === '') setIsValid(false)
      else setIsValid(true)
   }

   const handleFile = (imageList) => {
      setThumb(imageList)
   }

   const handleUpdateProject = () => {
      if (!isValid) return
      let _formData = new FormData()
      _formData.append('title', title)
      _formData.append('content', contentRef.current)
      thumb.forEach(t => _formData.append('projectThumb', t.data_url))
      dispatch(updateProjectById(projectId, _formData, history))
   }


   return project && (<Grid container>
      <FormGroup style={{ border: "1px dotted #535c68", padding: "1rem 1.5rem" }}>
         <Grid item md={8} sm={6}>
            <FormControl name='title'>
               <FormHelperText>Nhập tiêu đề bài viết</FormHelperText>
               <TextField defaultValue={project.title}
                  variant="outlined" label="Tiêu đề"
                  onChange={handleTitleChange}
               />
            </FormControl>

            <FormControl fullWidth>
               <FormHelperText>Nhập nội dung bài viết</FormHelperText>
               <RichTextEditor getContentFromRTE={getContentFromRTE} defaultValue={project.content} />
            </FormControl>
         </Grid>
         <Grid item md={4} sm={6}>
            <FormControl fullWidth>
               <img width="100px" height="120px" alt={project.title} src={project.projectThumb[0].url} />
               <FormHelperText> Chọn ảnh tiêu đề bài viết </FormHelperText>
               <FormHelperText> * Chỉ được chọn 1 ảnh</FormHelperText>

               <ImageUploadComponent maxNumber={1} isMultiple={false} handleFile={handleFile} imageList={thumb} />
            </FormControl>
            <FormControl onClick={handleUpdateProject}>
               <Button disabled={!isValid || loadingProj}
                  style={{ marginTop: "2rem" }}
                  color="primary" variant="contained" >
                  {loadingProj ? <CircularProgress /> : "Lưu bài viết"} </Button>
            </FormControl>
         </Grid>
      </FormGroup >
   </Grid >
   )
}

export default DetailProject