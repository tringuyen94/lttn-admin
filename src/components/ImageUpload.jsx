import React, { useState } from 'react'
import ImageUploading from 'react-images-uploading'
import { FormHelperText, IconButton, Grid } from '@material-ui/core'
import { PhotoCamera, Edit, Delete } from '@material-ui/icons'


const ImageUploadComponent = ({ maxNumber, isMultiple, handleFile, imageList }) => {
   const [images, setImages] = useState()

   return (
      <ImageUploading
         multiple={isMultiple}
         value={images}
         onChange={imageList => {
            setImages(imageList)
            handleFile(imageList)
         }}
         maxNumber={maxNumber}
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
               {errors && <FormHelperText style={{ color: "red" }}>Kiểm tra số lượng ảnh</FormHelperText>}
               <div>
                  <IconButton
                     component="span"
                     variant="outlined"
                     color={isDragging ? 'secondary' : "primary"}
                     onClick={onImageUpload}
                     {...dragProps}
                  >
                     <PhotoCamera style={{ fontSize: "3rem" }} />
                  </IconButton>
               </div>
               &nbsp;
               <Grid container>
                  {imageList.map((image, index) => (
                     <Grid key={index} item md={2} >
                        <div className="image-item">
                           <img src={image.data_url} alt="selected" width="100px" height="120px" />
                           <div className="image-item__btn-wrapper">
                              <IconButton color="primary" onClick={() => onImageUpdate(index)}><Edit /></IconButton>
                              <IconButton color="secondary" onClick={() => onImageRemove(index)}><Delete /></IconButton>
                           </div>
                        </div>
                     </Grid>
                  ))}
               </Grid>
            </div>
         )
         }
      </ImageUploading >
   )
}

export default ImageUploadComponent