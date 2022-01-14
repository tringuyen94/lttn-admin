import React, { useState, useRef } from 'react'
import { Container, FormControl, FormGroup, FormHelperText, TextField, Button } from '@material-ui/core'
import './project.css'
import { useHistory } from 'react-router-dom'
import { createProject } from '../../redux/async-actions/project.action'
import RichTextEditor from '../../components/RichTextEditor';
import ImageUploadComponent from '../../components/ImageUpload'

const AddProject = () => {
   const history = useHistory()
   const contentRef = useRef(null)
   const [projectValue, setProjectValue] = useState({ title: '', images: [] })
   const [isValid, setIsValid] = useState(false)

   // Xử lý image vào state
   const handleFile = (imageList) => {
      setProjectValue({ ...projectValue, images: imageList })
   }
   // Set value từ Rich Text Editor
   const getContentFromRTE = (value) => {
      contentRef.current = value
      validateProjectForm()
   }

   // Check validate form 
   const validateProjectForm = () => {
      if (!projectValue.title ||
         projectValue.images.length === 0 ||
         contentRef.current === ''
      ) setIsValid(false)
      else setIsValid(true)
   }
   //Submit Form
   const handleSubmitProject = () => {
      if (isValid) {
         let _formData = new FormData()
         _formData.append('title', projectValue.title)
         _formData.append('content', contentRef.current)
         _formData.append('projectThumb',  projectValue.images[0].file)
         createProject(_formData, history)
      }
      return
   }


   return (
      <Container style={{ marginTop: "3rem" }} maxWidth="md">
         <FormGroup style={{ border: "1px dotted #535c68", padding: "1rem 1.5rem" }}>
            <FormControl name='title' onChange={e => {
               setProjectValue({
                  ...projectValue,
                  title: e.target.value
               })
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
               <Button disabled={!isValid} style={{ marginTop: "2rem" }} color="primary" variant="contained" > Lưu bài viết</Button>
            </FormControl>
         </FormGroup>
      </Container>
   )

}

export default AddProject