import React, { Fragment, useEffect, useState } from "react"
import MUIDataTable from "mui-datatables"
import { useSelector } from "react-redux"
import { fetchCategories } from "../../redux/async-actions/category.action"
import { Button, IconButton, TextField } from "@material-ui/core"
import { updateCategoryById } from "../../redux/async-actions/category.action"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router-dom"
import { Save, Edit } from "@material-ui/icons"

const CategoryTable = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.category.categories)

  const [isUpdate, setIsUpdate] = useState(false)
  const [nameCategory, setNameCategory] = useState()
  const history = useHistory()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])




  const handleChange = (e) => {
    setNameCategory({
      nameCategory: e.target.value,
    })
  }


  const columns = [
    {
      name: "_id",
      label: "Id",
      options: {
        filter: false,
        display: false,
      },
    },
    {
      name: "nameCategory",
      label: "Loại sản phẩm",
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
        display: isUpdate,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <TextField label="Nhập thay đổi" onChange={handleChange} />
            </div>
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
          return isUpdate ? (
            <IconButton
              variant="contained"
              color="primary"
              onClick={() => {
                dispatch(updateCategoryById(
                  nameCategory,
                  tableMeta.rowData[0],
                  history
                ))
              }}
            >
              <Save />
            </IconButton>
          ) : (
            <Button
              variant="contained"
              color="primary"
              startIcon={<Edit />}
              onClick={() => setIsUpdate(true)}
            >
              Cập nhật
            </Button>
          )
        },
      },
    },
  ]
  const options = {
    filterType: "dropdown",
    selectableRows: "none",

  }
  return (
    <Fragment>
      <MUIDataTable
        title={"Các loại sản phẩm "}
        data={categories ? categories : undefined}
        columns={columns}
        options={options}
      />
    </Fragment>
  )
}


export default CategoryTable
