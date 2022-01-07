import React, { useEffect, useState } from "react"
import {
  fetchProductById,
  updateProductById,
  updateProductImage
} from "../../redux/async-actions/product.action"
import {
  TextField,
  Button,
  NativeSelect,
  InputLabel,
  FormControl,
  FormGroup,
  Grid,
  IconButton,
  FormHelperText,
  Divider,
} from "@material-ui/core"
import ImageUploading from 'react-images-uploading'
import { Edit, Delete } from '@material-ui/icons'
import { fetchCategories } from "../../redux/async-actions/category.action"
import { fetchBrands } from "../../redux/async-actions/brand.action"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"

const DetailProduct = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const history = useHistory()
  const productById = useSelector(state => state.product.productById)
  const brands = useSelector(state => state.brand.brands)
  const categories = useSelector(state => state.category.categories)
  useEffect(() => {
    dispatch(fetchProductById(productId))
    dispatch(fetchCategories())
    dispatch(fetchBrands())
  }, [dispatch, productId])
  useEffect(() => {
    let result = []
    if (productById?.productImages) {
      productById.productImages.map(item => result.push({ 'data_url': item }))
    }
    setImages(result)
  }, [productById])
  const maxNumber = 4
  const [productValue, setProductValue] = useState()
  const [images, setImages] = useState()
  const [disabledSubmitImage, setDisabledSubmitImage] = useState(true)
  const handleChange = (e) => {
    setProductValue({
      ...productValue,
      [e.target.name]: e.target.value,
    })
  }
  const handleDetailChange = (value) => {
    setProductValue({
      ...productValue,
      detail: value,
    })
  }
  const handleFile = (imageList, addUpdateIndex) => {
    setImages(imageList)
    setDisabledSubmitImage(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    updateProductById(productValue, productId, history)
  }
  const handleImageSubmit = (e) => {
    e.preventDefault()
    let _formData = new FormData()
    for (let i = 0; i < images.length; i++) {
      _formData.append('productImages', images[i].file)
    }
    updateProductImage(_formData, productId, history)
  }
  return (
    productById && (
      <Grid container justifyContent="center">
        <Grid item md={6}>
          <FormGroup>
            <FormControl style={{ width: "400px", margin: "10px 20px" }} >
              <TextField
                label="Tên sản phẩm"
                defaultValue={productById.name}
                variant="filled"
                onChange={handleChange}
                fullWidth={true}
                name="name"
              />
            </FormControl>
            <FormControl style={{ width: "400px", margin: "10px 20px" }}>
              <InputLabel htmlFor="brand">Tên nhãn hàng</InputLabel>
              <NativeSelect
                inputProps={{
                  name: "brand",
                  id: "brand",
                }}
                variant="filled"
                defaultValue={productById.brand._id}
                onChange={handleChange}
              >
                {brands &&
                  brands.map((brand, index) => {
                    return (
                      <option option key={index}
                        value={brand._id} >
                        {brand.nameBrand}
                      </option>
                    )
                  })}
              </NativeSelect>
            </FormControl>
            <FormControl style={{ width: "400px", margin: "10px 20px" }}>
              <InputLabel htmlFor="categories">Loại sản phẩm</InputLabel>
              <NativeSelect
                inputProps={{
                  name: "category",
                  id: "category",
                }}
                defaultValue={productById.category._id}
                onChange={handleChange}
              >
                {categories &&
                  categories.map((category, index) => {
                    return (
                      <option key={index} value={category._id}>
                        {category.nameCategory}
                      </option>
                    )
                  })}
              </NativeSelect>
            </FormControl>
            <FormControl style={{ width: "400px", margin: "10px 20px" }}>
              <ReactQuill
                defaultValue={productById.detail}
                onChange={handleDetailChange}
              />
            </FormControl>
            <FormControl style={{ width: "200px", margin: "10px 20px" }}>
              <TextField
                name="capacity"
                label="Công suất"
                defaultValue={productById.capacity}
                variant="filled"
                onChange={handleChange}
              />
            </FormControl>
            <FormControl style={{ width: "200px", margin: "10px 20px" }}>
              <InputLabel htmlFor="isNewProduct">Tình trạng</InputLabel>
              <NativeSelect
                inputProps={{
                  name: "isNewProduct",
                  id: "isNewProduct",
                }}
                defaultValue={productById.isNewProduct ? true : false}
                onChange={handleChange}
              >
                <option value={true}>Mới </option>
                <option value={false}>Cũ</option>
              </NativeSelect>

            </FormControl>
            <FormHelperText> ** Thay đổi nội dung muốn thay đổi xong nhấn Lưu</FormHelperText>
            <FormControl style={{ padding: "0 40px" }} s fullWidth >
              <Button disabled={productValue ? false : true} variant="contained" color="primary" onClick={handleSubmit}>
                Lưu
              </Button>
            </FormControl>
          </FormGroup >
        </Grid>
        <Divider />
        <Grid item md={6}>

          <FormControl >
            <FormHelperText> *** Muốn cập nhật hình mới phải xoá tất cả ảnh cũ sau đó chọn lại ảnh mới </FormHelperText>
            <ImageUploading
              multiple
              value={images}
              onChange={handleFile}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <div>
                    <Button
                      variant="outlined"
                      color={isDragging ? 'secondary' : "primary"}
                      onClick={onImageUpload}
                      {...dragProps}
                    >
                      Nhấp vào đây để chọn ảnh
                    </Button>
                    <Button color="secondary" variant="outlined" onClick={onImageRemoveAll}>Xoá tất cả ảnh đang chọn</Button>
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
          <FormControl style={{ padding: "0 40px" }} fullWidth >
            <Button disabled={disabledSubmitImage} variant="contained" color="primary" onClick={handleImageSubmit}>
              Lưu ảnh mới
            </Button>
          </FormControl>
        </Grid>
      </Grid >
    )
  )
}


export default DetailProduct
