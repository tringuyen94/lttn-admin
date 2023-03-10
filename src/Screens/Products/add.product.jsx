import React, { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux"
import { createProduct } from "../../redux/async-actions/product.action"
import { fetchBrands } from "../../redux/async-actions/brand.action"
import { fetchCategories } from "../../redux/async-actions/category.action"
import { Button, CircularProgress, FormControl, FormHelperText, Grid, Select, TextField } from "@material-ui/core"
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
  const loadingProd = useSelector(state => state.product.loading)

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

  /// Submit Form Data
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    let formData = new FormData()
    /**
     * Append Data from input to formData
     */
    formData.append('name', productValue.name)
    formData.append('brand', productValue.brand)
    formData.append('category', productValue.category)
    formData.append('detail', contentRef.current)
    formData.append('capacity', productValue.capacity)
    formData.append('isNewProduct', productValue.isNewProduct)
    images.forEach(image => formData.append('productImages', image.data_url))
    // Call API
    dispatch(createProduct(formData, history))
  }

  //Validate Input
  const validateValue = () => {
    if (productValue.name === '' ||
      productValue.brand === '' ||
      productValue.category === '' ||
      contentRef.current === '' ||
      productValue.capacity === '' ||
      productValue.isNewProduct === '' ||
      images.length !== 4
    ) {
      setIsValid(false)
    }
    else setIsValid(true)
  }

  return (
    <Grid container justify="space-between">
      <Grid item md={4} style={{ padding: "1.3rem 1.8rem" }}>
        <FormHelperText>Ch???n lo???i s???n ph???m</FormHelperText>
        <FormControl variant="filled" fullWidth>
          <Select
            native
            name="category"
            value={productValue.category}
            onChange={handleChange}
          >
            <option defaultValue>Lo???i s???n ph???m</option>
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
          <FormHelperText>Ch???n h??ng </FormHelperText>
          <Select
            native
            name="brand"
            onChange={handleChange}
          >
            <option defaultValue>Ch???n h??ng</option>
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
          <FormHelperText>Nh???p t??n s???n ph???m</FormHelperText>
          <TextField
            variant="filled"
            label="T??n s???n ph???m"
            name="name"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth>
          <FormHelperText>Nh???p c??ng su???t c???a m??y ( c?? th??? b??? qua tr?????ng n??y )</FormHelperText>
          <TextField
            variant="filled"
            placeholder="Nh???p c??ng su???t"
            name="capacity"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth variant="filled">
          <FormHelperText>Nh???p t??nh tr???ng m??y</FormHelperText>
          <Select
            native
            id="inputState"
            name="isNewProduct"
            onChange={handleChange}
          >
            <option defaultValue>T??nh tr???ng</option>
            <option value={true}>M???i</option>
            <option value={false}>C??</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item md={8} style={{ padding: "1.3rem 1.8rem" }}>
        <FormControl fullWidth>
          <FormHelperText> Ch???n 4 ???nh s???n ph???m  </FormHelperText>
          <ImageUploadComponent
            maxNumber={4}
            isMultiple={true}
            handleFile={handleFile} />
        </FormControl>
        <FormControl fullWidth>
          <FormHelperText>Nh???p chi ti???t s???n ph???m</FormHelperText>
          <RichTextEditor getContentFromRTE={getContentFromRTE} />
        </FormControl>
        <FormControl fullWidth>
          <Button disabled={!isValid || loadingProd} variant="contained" color="primary" type="submit" onClick={handleSubmit} align="center">
            {loadingProd ? <CircularProgress /> : "Th??m s???n ph???m"}
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  )
}


export default AddProduct
