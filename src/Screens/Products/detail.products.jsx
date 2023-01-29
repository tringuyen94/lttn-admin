import React, { useRef, useEffect, useState, Fragment } from "react"
import {
  fetchProductById,
  updateProductById,
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
  CircularProgress,
} from "@material-ui/core"
import { fetchCategories } from "../../redux/async-actions/category.action"
import { fetchBrands } from "../../redux/async-actions/brand.action"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import ImageUploadComponent from "../../components/ImageUpload"
import RichTextEditor from "../../components/RichTextEditor"

const DetailProduct = () => {
  const dispatch = useDispatch()
  const { productId } = useParams()
  const history = useHistory()
  const productById = useSelector(state => state.product.productById)
  const loadingProd = useSelector(state => state.product.loading)
  const brands = useSelector(state => state.brand.brands)
  const categories = useSelector(state => state.category.categories)
  const contentRef = useRef(null)

  useEffect(() => {
    dispatch(fetchProductById(productId))
    dispatch(fetchCategories())
    dispatch(fetchBrands())
  }, [dispatch, productId])




  const [productValue, setProductValue] = useState()
  const [images, setImages] = useState([])
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
    if (imageList.length < 4) return setIsValid(false)
    setImages(imageList)
    setIsValid(true)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid) return
    let _formData = new FormData()
    _formData.append('name', productValue?.name)
    _formData.append('brand', productValue?.brand)
    _formData.append('category', productValue?.category)
    _formData.append('capacity', productValue?.capacity)
    _formData.append('isNewProduct', productValue?.isNewProduct)
    _formData.append('detail', contentRef.current)
    images.forEach(image => _formData.append('productImages', image.data_url))
    dispatch(updateProductById(_formData, productId, history))

  }

  return (
    productById && (
      <Grid container justify="center">
        <FormGroup>
          <Grid item md={6}>
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
            <FormControl style={{ width: "200px", margin: "10px 20px" }}>
              <TextField
                name="capacity"
                label="Công suất"
                defaultValue={productById.capacity}
                variant="filled"
                onChange={handleChange}
              />
            </FormControl>
            <FormHelperText> ** Thay đổi nội dung muốn thay đổi xong nhấn Lưu</FormHelperText>
          </Grid>
          <Grid item md={6}>
            <Grid container>
              {productById.productImages.map((item, index) => (
                <Grid key={index} item >
                  <img width="100px" height="120px" src={item.url} alt={productById.name} />
                </Grid>
              ))}
            </Grid>
            <FormControl >
              <ImageUploadComponent maxNumber={4} isMultiple={true} handleFile={handleFile} imageList={images} />
              <FormHelperText> *** Chọn ảnh mới để cập nhật </FormHelperText>
            </FormControl>
          </Grid>
          <FormControl style={{ padding: "0 40px" }} >
            <Button
              disabled={!isValid || loadingProd} variant="contained" color="primary" onClick={handleSubmit}>
              {loadingProd ? <CircularProgress /> : "Lưu"}
            </Button>
          </FormControl >
        </FormGroup >

      </Grid >
    )
  )
}


export default DetailProduct
