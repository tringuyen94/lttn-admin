import React, { useState } from 'react'
import { Grid, Container, FormControl, FormGroup, FormHelperText, TextField, Button, IconButton } from '@material-ui/core'
import './project.css'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import ImageUploading from 'react-images-uploading'
import { Edit, Delete, PhotoCamera } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import { createProject } from '../../redux/async-actions/project.action'

const AddProject = () => {
   const MAX_NUMBER = 1
   const history =useHistory()
   const [images, setImages] = useState([]);

   const [projectValue, setProjectValue] = useState({})
   const handleFile = (imageList) => {
      setImages(imageList)
   }

   const [isValid,setIsValid] = useState(false)
   const handleContentChange = (value) => {
      setProjectValue({
         ...projectValue,
         content: value
      })
      validateProjectForm()
   }

   const validateProjectForm = () => {
      if (!projectValue.title ||
         !projectValue.content ||
         images.length === 0 
      ) setIsValid(false)
      else setIsValid(true)
   }

   const handleSubmitProject = () => {
      let _formData = new FormData()
      _formData.append('title', projectValue.title)
      _formData.append('content', projectValue.content)
      _formData.append('projectThumb', images[0].file)
      createProject(_formData,history)
   }
   return (
      <Container maxWidth="sm">
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
               <FormHelperText> * Chỉ được chọn 1 ảnh</FormHelperText>
               <ImageUploading
                  multiple
                  value={images}
                  onChange={handleFile}
                  maxNumber={MAX_NUMBER}
                  dataURLKey="data_url"
               >
                  {({
                     imageList,
                     onImageUpload,
                     onImageUpdate,
                     onImageRemove,
                     errors,
                     isDragging,
                     dragProps,
                  }) => (
                     // write your building UI
                     <div className="upload__image-wrapper">
                        {errors && <FormHelperText style={{ color: "red" }}>Chỉ được chọn 1 ảnh</FormHelperText>}
                        <div>
                           <IconButton
                              component="span"
                              variant="outlined"
                              color={isDragging ? 'secondary' : "primary"}
                              onClick={onImageUpload}
                              {...dragProps}
                           >
                              <PhotoCamera style={{ fontSize: "5rem" }} />
                           </IconButton>
                        </div>
                        &nbsp;
                        <Grid container>
                           {imageList.map((image, index) => (
                              <Grid key={index} item md={6}>
                                 <div className="image-item">
                                    <img src={image['data_url']} alt="selected" />
                                    <div className="image-item__btn-wrapper">
                                       <IconButton color="primary" onClick={() => onImageUpdate(index)}><Edit /></IconButton>
                                       <IconButton color="secondary" onClick={() => onImageRemove(index)}><Delete /></IconButton>
                                    </div>
                                 </div>
                              </Grid>
                           ))}
                        </Grid>
                     </div>
                  )}
               </ImageUploading>
            </FormControl>
            <FormControl fullWidth>
               <FormHelperText>Nhập nội dung bài viết</FormHelperText>
               <ReactQuill
                  placeholder="Hãy viết gì đó..."
                  onChange={handleContentChange}
               />
            </FormControl>
            <FormControl onClick={handleSubmitProject}>
               <Button disabled={!isValid} style={{ marginTop: "2rem" }} color="primary" variant="contained" > Lưu bài viết</Button>
            </FormControl>
         </FormGroup>

      </Container>
   )
}

export default AddProject