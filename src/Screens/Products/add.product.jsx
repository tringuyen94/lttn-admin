import React, {  useState, useEffect } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useDispatch, useSelector } from "react-redux"
import { createProduct } from "../../redux/async-actions/product.action"
import { fetchBrands } from "../../redux/async-actions/brand.action"
import { fetchCategories } from "../../redux/async-actions/category.action"
import { Button, FormControl, FormHelperText, Grid, IconButton, Select, TextField } from "@material-ui/core"
import ImageUploading from 'react-images-uploading'
import './product.css'
import { Delete, Edit } from "@material-ui/icons"
import { useHistory } from "react-router-dom"


const AddProduct = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const brands = useSelector(state => state.brand.brands)
  const categories = useSelector(state => state.category.categories)

  const [productValue, setProductValue] = useState({})
  const [images, setImages] = useState([]);
  const [checkValue,setCheckValue] =useState(true)



  const maxNumber = 4;


  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchBrands())
  }, [dispatch])



  const handleChange = (e) => {
    setProductValue({
      ...productValue,
      [e.target.name]: e.target.value,
    })
    validateValue()
  }
  const handleChangeDetail = (value) => {
    setProductValue({
      ...productValue,
      detail: value,
    })
    validateValue()

  }
  const handleFile = (imageList) => {
    // data for submit
    setImages(imageList);
    validateValue()
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', productValue.name)
    formData.append('brand', productValue.brand)
    formData.append('category', productValue.category)
    formData.append('detail', productValue.detail)
    formData.append('capacity', productValue.capacity)
    formData.append('isNewProduct', productValue.isNewProduct)
    for (let i = 0; i < images.length; i++) {
      formData.append('productImages', images[i].file)
    }
    createProduct(formData, history)
    // document.getElementById("addproducts").reset()
    // textEditor[0].innerHTML = ''
  }
  const validateValue = () => {
    if (!productValue.name ||
      !productValue.brand ||
      !productValue.category ||
      !productValue.detail ||
      !productValue.capacity ||
      !productValue.isNewProduct ||
      images.length < 4
    ) return setCheckValue(true)
    return setCheckValue(false)
  }

  return (
    <Grid container justify="space-between">
      <Grid item md={4} style={{ padding: "1.3rem 1.8rem" }}>
        <FormHelperText>Chọn loại sản phẩm</FormHelperText>
        <FormControl variant="filled" fullWidth>
          <Select
            native
            name="category"
            value={productValue.category}
            onChange={handleChange}
          >
            <option defaultValue>Loại sản phẩm</option>
            {categories && categories.map((category, index) => {
              return (
                <option key={index} value={category._id}>
                  {category.nameCategory}
                </option>
              )
            })}
          </Select>
        </FormControl>
        <FormControl variant="filled" fullWidth>
          <FormHelperText>Chọn hãng </FormHelperText>
          <Select
            native
            name="brand"
            onChange={handleChange}
          >
            <option defaultValue>Chọn hãng</option>
            {brands &&
              brands.map((brand, index) => {
                return (
                  <option key={index} value={brand._id}>
                    {brand.nameBrand}
                  </option>
                )
              })}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <FormHelperText>Nhập tên sản phấm</FormHelperText>
          <TextField
            variant="filled"
            label="Tên sản phẩm"
            name="name"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormHelperText>Nhập công suất của máy ( có thể bỏ qua trường này )</FormHelperText>
          <TextField
            variant="filled"
            placeholder="Nhập công suất"
            name="capacity"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth variant="filled">
          <FormHelperText>Nhập tình trạng máy</FormHelperText>
          <Select
            native
            id="inputState"
            name="isNewProduct"
            onChange={handleChange}
          >
            <option defaultValue>Tình trạng</option>
            <option value={true}>Mới</option>
            <option value={false}>Cũ</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={8} style={{ padding: "1.3rem 1.8rem" }}>
        <FormControl fullWidth>
          <FormHelperText> Chọn 4 ảnh sản phẩm  </FormHelperText>
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
        <FormControl fullWidth>
          <FormHelperText>Nhập chi tiết sản phẩm</FormHelperText>
          <ReactQuill
            placeholder="Hãy viết gì đó"
            onChange={handleChangeDetail}
          />
        </FormControl>
        <FormControl fullWidth>
          <Button disabled={checkValue} variant="contained" color="primary" type="submit" onClick={handleSubmit} align="center">
            Thêm sản phẩm
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  )
}


export default AddProduct
