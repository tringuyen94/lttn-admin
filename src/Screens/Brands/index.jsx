import React, { Fragment, useState } from "react"
import BrandTable from "./table.brands"
import { addBrand } from "../../redux/async-actions/brand.action"
import './brand.css'
import { useDispatch } from "react-redux"
import { Button, TextField } from "@material-ui/core"
const Brands = () => {
  const [nameBrand, setNameBrand] = useState('')
  const dispatch = useDispatch()
  const handleAddBrand = (e) => {
    e.preventDefault()
    dispatch(addBrand(nameBrand))
    setNameBrand('')
  }
  return (
    <Fragment>
      <div className="brand__container">
        <TextField
          variant="filled"
          label="Nhập nhãn hàng"
          name="nameBrand"
          value={nameBrand}
          onChange={(e) =>setNameBrand(e.target.value)}
        />
        <Button
          color="primary"
          variant="outlined"
          onClick={handleAddBrand}
          disabled={!nameBrand}
        >
          Thêm
        </Button>
      </div>
      <BrandTable />
    </Fragment>
  )
}

export default Brands
