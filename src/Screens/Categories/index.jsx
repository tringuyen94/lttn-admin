import React, { Fragment, useState } from "react"
import CategoryTable from "./table.categories"
import { addCategory } from "../../redux/async-actions/category.action"
import { Button, TextField } from "@material-ui/core"
import { useDispatch } from "react-redux"
import "./category.css"
const Categories = () => {
  const [nameCategory, setNameCategory] = useState('')
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addCategory(nameCategory))
    setNameCategory('')
  }
  return (
    <Fragment>
      <div className="category__container">
        <TextField
          variant="filled"
          label="Nhập loại sản phẩm"
          name="nameCategory"
          value={nameCategory}
          onChange={(e) => setNameCategory(e.target.value)}
        />
        <Button color="primary" variant="outlined" onClick={handleSubmit}>
          Thêm
        </Button>
      </div>
      <CategoryTable />
    </Fragment>
  )
}
export default Categories
