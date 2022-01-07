import React, { Fragment, useEffect, useState } from "react"
import MUIDataTable from "mui-datatables"
import {
  fetchBrands,
  updateBrandById,
} from "../../redux/async-actions/brand.action"
import { Button, IconButton, TextField } from "@material-ui/core"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { Edit, Save } from "@material-ui/icons"

const BrandTable = () => {
  const dispatch = useDispatch()
  const brands = useSelector(state => state.brand.brands)
  const history = useHistory()
  const [nameBrand, setNameBrand] = useState()
  const [isEdit, setIsEdit] = useState(false)
  const handleChange = (e) => {
    setNameBrand({
      nameBrand: e.target.value,
    })
  }
  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])
  const columns = [
    {
      name: "_id",
      label: "Id",
      options: {
        display: false,
        filter: false,
      },
    },
    {
      name: "nameBrand",
      label: "Nhãn hàng",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "Update",
      options: {
        filter: false,
        sort: false,
        display: isEdit,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <TextField label="Nhập thay đổi" onChange={handleChange} />
          )
        },
      },
    },
    {
      name: "Setting",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return isEdit ? (
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => {
                updateBrandById(nameBrand, tableMeta.rowData[0], history)
              }}
            >
              <Save />
            </IconButton>
          ) : (
            <>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={() => setIsEdit(true)}
              >
                Cập nhật
              </Button>
            </>
          )
        },
      },
    },
  ]
  const options = {
    filterType: "dropdown",
    selectableRows:"none"
  }
  return (
    <Fragment>
      <MUIDataTable
        title={"Các nhãn hàng"}
        data={brands ? brands : undefined}
        columns={columns}
        options={options}
      />
    </Fragment>
  )
}


export default BrandTable
