import React, { useState, useRef } from 'react'
import { Container, FormControl, FormGroup, FormHelperText, TextField, Button, CircularProgress } from '@material-ui/core'
import './project.css'
import { useHistory } from 'react-router-dom'
import { createProject } from '../../redux/async-actions/project.action'
import RichTextEditor from '../../components/RichTextEditor';
import ImageUploadComponent from '../../components/ImageUpload'
import { useDispatch, useSelector } from 'react-redux'

const AddProject = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const contentRef = useRef(null)
   const loadingProj = useSelector(state => state.project.loading)
   const [images, setImages] = useState([])
   const [title, setTitle] = useState('')
   const [isValid, setIsValid] = useState(false)

   // Xử lý image vào state
   const handleFile = (imageList) => {
      setImages(imageList)
      validateProjectForm()
   }
   // Set value từ Rich Text Editor
   const getContentFromRTE = (value) => {
      contentRef.current = value
      validateProjectForm()
   }

   // Check validate form 
   const validateProjectForm = () => {
      if (!title ||
         images.length !== 1 ||
         contentRef.current === ''
      ) setIsValid(false)
      else setIsValid(true)
   }
   //Submit Form
   const handleSubmitProject = () => {
      if (!isValid) return
      let _formData = new FormData()
      _formData.append('title', title)
      _formData.append('content', contentRef.current)
      images.forEach(image => _formData.append('projectThumb', image.data_url))
      dispatch(createProject(_formData, history))
   }


   return (
      <Container style={{ marginTop: "3rem" }} maxWidth="md">
         <FormGroup style={{ border: "1px dotted #535c68", padding: "1rem 1.5rem" }}>
            <FormControl name='title' onChange={e => {
               setTitle(e.target.value)
               validateProjectForm()
            }}>
               <FormHelperText>Nhập tiêu đề bài viết</FormHelperText>
               <TextField variant="outlined" label="Tiêu đề" />
            </FormControl>
            <FormControl fullWidth>
               <FormHelperText> Chọn ảnh tiêu đề bài viết </FormHelperText>
               <ImageUploadComponent maxNumber={1} isMultiple={false} handleFile={handleFile} />
            </FormControl>
            <FormControl fullWidth>
               <FormHelperText perText>Nhập nội dung bài viết</FormHelperText>
               <RichTextEditor getContentFromRTE={getContentFromRTE} />
            </FormControl>
            <FormControl onClick={handleSubmitProject}>
               <Button disabled={!isValid || loadingProj} style={{ marginTop: "2rem" }} color="primary" variant="contained" >
                  {loadingProj ? <CircularProgress /> : 'Lưu bài viết'}</Button>
            </FormControl>
         </FormGroup>1
      </Container>
   )

}

export default AddProject