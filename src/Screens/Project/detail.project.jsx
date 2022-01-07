import React, { useState, useEffect}  from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { fetchProjectById, updateProjectById } from '../../redux/async-actions/project.action'
import ImageUploading from 'react-images-uploading'
import {
   FormGroup, FormControl,
   FormHelperText, TextField, IconButton, Grid, Button
} from '@material-ui/core'
import { PhotoCamera, Edit, Delete } from '@material-ui/icons'
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"


const DetailProject = () => {
   const MAX_NUMBER = 1
   const { projectId } = useParams()
   const dispatch = useDispatch()
   const history = useHistory()
   const project = useSelector(state => state.project.projectById)

   const [projectValue, setProjectValue] = useState({})
   const [images, setImages] = useState([])
   const [isValid, setIsValid] = useState(false)
   const [isThumbValid, setIsThumbValid] = useState(false)





   const handleContentChange = (value) => {
      setProjectValue({
         ...projectValue,
         content: value
      })
      validateProjectForm()
   }
   const validateProjectForm = () => {
      if (!projectValue.title ||
         !projectValue.content
      ) return setIsValid(false)
      else setIsValid(true)
   }
   const handleUpdateProject = () => {
      updateProjectById(projectId, projectValue, history)
   }

   const validateProjectThumb = () => {
      if (images.length === 0) return setIsThumbValid(false)
      return setIsThumbValid(true)
   }
   const handleFile = (imageList) => {
      setImages(imageList)
      validateProjectThumb()
   }
   const handleUpdateProjectThumb = () => {
      let _formData = new FormData()
      _formData.append('projectThumb', images[0].file)

   }


   useEffect(() => {
      dispatch(fetchProjectById(projectId))
   }, [dispatch, projectId])
   useEffect(() => {
      let result = []
      if (project?.projectThumb) {
         result.push({ 'data_url': project.projectThumb })
      }
      setImages(result)
   }, [project])


   return project && (<Grid container>
      <Grid item md={6}>
         <FormGroup style={{ border: "1px dotted #535c68", padding: "1rem 1.5rem" }}>
            <FormControl name='title' onChange={e => {
               setProjectValue({
                  ...projectValue,
                  title: e.target.value
               })
               validateProjectForm()
            }}>
               <FormHelperText>Nhập tiêu đề bài viết</FormHelperText>
               <TextField defaultValue={project.title} variant="outlined" label="Tiêu đề" />
            </FormControl>

            <FormControl fullWidth>
               <FormHelperText>Nhập nội dung bài viết</FormHelperText>
               <ReactQuill
                  placeholder="Hãy viết gì đó..."
                  defaultValue={project.content}
                  onChange={handleContentChange}
               />
            </FormControl>

            <FormControl onClick={handleUpdateProject}>
               <Button disabled={isValid} style={{ marginTop: "2rem" }} color="primary" variant="contained" > Lưu bài viết</Button>
            </FormControl>
         </FormGroup>
      </Grid>
      <Grid item md={6}>
         <FormGroup style={{ border: "1px dotted #535c68", padding: "1rem 1.5rem" }}>
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
            <FormControl>
               <Button disabled={!isThumbValid} variant="contained" color="primary" onClick={handleUpdateProjectThumb}>Lưu ảnh tiêu đề</Button>
            </FormControl>
         </FormGroup>
      </Grid>
   </Grid>
   )
}

export default DetailProject