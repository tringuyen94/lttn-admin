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
  FormHelperText,
} from "@material-ui/core"
import { fetchCategories } from "../../redux/async-actions/category.action"
import { fetchBrands } from "../../redux/async-actions/brand.action"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { domain } from "../../services/baseURL.services"
import ImageUploadComponent from "../../components/ImageUpload"
import RichTextEditor from "../../components/RichTextEditor"
import { useRef } from "react"

const DetailProduct = () => {


  const dispatch = useDispatch()
  const { productId } = useParams()
  const history = useHistory()
  const productById = useSelector(state => state.product.productById)
  const brands = useSelector(state => state.brand.brands)
  const categories = useSelector(state => state.category.categories)
  const contentRef = useRef(null)

  useEffect(() => {
    dispatch(fetchProductById(productId))
    dispatch(fetchCategories())
    dispatch(fetchBrands())
  }, [dispatch, productId])


  useEffect(() => {
    let result = []
    if (productById?.productImages) {
      productById.productImages.map(item => result.push({ 'data_url': domain + '/' + item }))
    }
    setImages(result)
  }, [productById])



  const [productValue, setProductValue] = useState()
  const [images, setImages] = useState()
  const [disabledSubmitImage, setDisabledSubmitImage] = useState(true)
  const [isValid, setIsValid] = useState(false)


  const handleChange = (e) => {
    setProductValue({
      ...productValue,
      [e.target.name]: e.target.value,
    })
    setIsValid(true)
  }
  const getContentFromRTE = (value) => {
    contentRef.current = value
    if (productById.detail !== contentRef.current) return setIsValid(true)
  }

  const handleFile = (imageList) => {
    setImages(imageList)
    setDisabledSubmitImage(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    updateProductById({ ...productValue, detail: contentRef.current }, productId, history)
  }
  const handleImageSubmit = (e) => {
    e.preventDefault()
    if(disabledSubmitImage) return 
    let _formData = new FormData()
    for (let i = 0; i < images.length; i++) {
      _formData.append('productImages', images[i].file)
    }
    updateProductImage(_formData, productId, history)
  }
  return (
    productById && (
      <Grid container justify="center">
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
                      <option
                        key={index}
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
              <RichTextEditor getContentFromRTE={getContentFromRTE} defaultValue={productById.detail} />
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
            <FormControl style={{ padding: "0 40px" }} fullWidth >
              <Button disabled={!isValid} variant="contained" color="primary" onClick={handleSubmit}>
                Lưu
              </Button>
            </FormControl>
          </FormGroup >
        </Grid>
        <Grid item md={6}>
          <FormControl >
            <FormHelperText> *** Muốn cập nhật hình mới phải xoá tất cả ảnh cũ sau đó chọn lại ảnh mới </FormHelperText>
            <ImageUploadComponent maxNumber={4} isMultiple={true} handleFile={handleFile} imageList={images} />
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
