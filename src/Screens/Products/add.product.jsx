import React, { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { createProduct } from "../../redux/async-actions/product.action"
import { fetchBrands } from "../../redux/async-actions/brand.action"
import { fetchCategories } from "../../redux/async-actions/category.action"
import { Button, FormControl, FormHelperText, Grid, Select, TextField } from "@material-ui/core"
import './product.css'
import { useHistory } from "react-router-dom"
import RichTextEditor from "../../components/RichTextEditor"
import { useRef } from "react"
import ImageUploadComponent from "../../components/ImageUpload"


const AddProduct = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const brands = useSelector(state => state.brand.brands)
  const categories = useSelector(state => state.category.categories)
  const contentRef = useRef(null)
  const [productValue, setProductValue] = useState({})
  const [images, setImages] = useState([]);
  const [isValid, setIsValid] = useState(false)





  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchBrands())
  }, [dispatch])

  const getContentFromRTE = (value) => {
    contentRef.current = value
    validateValue()
  }
  const handleChange = (e) => {
    setProductValue({
      ...productValue,
      [e.target.name]: e.target.value,
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
    if (isValid) {
      let formData = new FormData()
      formData.append('name', productValue.name)
      formData.append('brand', productValue.brand)
      formData.append('category', productValue.category)
      formData.append('detail', contentRef.current)
      formData.append('capacity', productValue.capacity)
      formData.append('isNewProduct', productValue.isNewProduct)
      for (let i = 0; i < images.length; i++) {
        formData.append('productImages', images[i].file)
      }
      createProduct(formData, history)
    }
    else return
  }
  const validateValue = () => {
    if (productValue.name === '' ||
      productValue.brand === '' ||
      productValue.category === '' ||
      contentRef.current === '' ||
      productValue.capacity === '' ||
      productValue.isNewProduct === '' ||
      images.length !== 4
    ) return setIsValid(false)
    return setIsValid(true)
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
          <ImageUploadComponent maxNumber={4} isMultiple={true} handleFile={handleFile} />
        </FormControl>
        <FormControl fullWidth>
          <FormHelperText>Nhập chi tiết sản phẩm</FormHelperText>
          <RichTextEditor getContentFromRTE={getContentFromRTE} />
        </FormControl>
        <FormControl fullWidth>
          <Button disabled={!isValid} variant="contained" color="primary" type="submit" onClick={handleSubmit} align="center">
            Thêm sản phẩm
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  )
}


export default AddProduct
