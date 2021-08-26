import React, { useEffect, Fragment, useState } from "react"
import {
  fetchProductById,
  updateProductById,
} from "../../redux/async-actions/product.action"
import { connect } from "react-redux"
import {
  TextField,
  Button,
  NativeSelect,
  InputLabel,
  FormControl,
} from "@material-ui/core"
import { withRouter } from "react-router-dom"
import ImageServices from "../../services/image.services"
import { subDomain } from "../../services/baseURL.services"
import { fetchCategories } from "../../redux/async-actions/category.action"
import { fetchBrands } from "../../redux/async-actions/brand.action"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const DetailProduct = ({
  match,
  history,
  dispatch,
  productById,
  categories,
  brands,
}) => {
  const { id } = match.params
  useEffect(() => {
    dispatch(fetchProductById(id))
    dispatch(fetchCategories())
    dispatch(fetchBrands())
  }, [])
  const [uploadImage, setUploadImage] = useState()
  const [uploadImageUrl, setUploadImageUrl] = useState()
  const [productValue, setProductValue] = useState()
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
  const handleFile = (e) => {
    setUploadImage(e.target.files[0])
    let reader = new FileReader()
    reader.addEventListener(
      "load",
      () => setUploadImageUrl(String(reader.result)),
      false
    )
    reader.readAsDataURL(e.target.files[0])
    const formData = new FormData()
    formData.append("products", e.target.files[0])
    ImageServices.uploadImage(formData)
      .then((res) => {
        setProductValue({
          ...productValue,
          image: res.data._id,
        })
      })
      .catch((err) => console.log)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    let result = Object.assign(productById, productValue)
    updateProductById(result, id, history)
  }
  return (
    productById && (
      <Fragment>
        <div className="detail__wrapper container mt-3">
          <form>
            <div>
              <img
                src={subDomain + "/" + productById.image.path}
                alt="#product"
                width="100px"
              />
              <input type="file" name="image" onChange={handleFile} />
              <label >Cập nhật hình ảnh</label>
              <img
                src={uploadImageUrl}
                width="100px"
                id="preview__image border border-1 mt-2"
              />
            </div>

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
                onChange={handleChange}
              >
                {brands &&
                  brands.map((brand, index) => {
                    return (
                      <option key={index} value={brand._id}>
                        {brand.nameBrand}
                      </option>
                    )
                  })}
              </NativeSelect>
            </FormControl>
            <br />
            <FormControl style={{ width: "800px", margin: "10px 20px" }}>
              <ReactQuill
                defaultValue={productById.detail}
                onChange={handleDetailChange}
              />
            </FormControl>
            <br />
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
              <InputLabel htmlFor="isNewOne">Tình trạng</InputLabel>
              <NativeSelect
                inputProps={{
                  name: "isNewOne",
                  id: "isNewOne",
                }}
                defaultValue={productById.isNewOne ? "Mới" : "Cũ"}
                onChange={handleChange}
              >
                <option value={true}>Mới </option>
                <option value={false}>Cũ</option>
              </NativeSelect>
            </FormControl>
            <br />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Lưu
            </Button>
          </form>
        </div>
      </Fragment >
    )
  )
}
const mapStateToProps = (state) => {
  return {
    productById: state.product.productById,
    categories: state.category.categories,
    brands: state.brand.brands,
  }
}

export default withRouter(connect(mapStateToProps)(DetailProduct))
