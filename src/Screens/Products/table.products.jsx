import React, { Fragment, useEffect } from "react"
import MUIDataTable from "mui-datatables"
import { Button } from "@material-ui/core"
import {  subDomain } from "../../services/baseURL.services"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"
import { fetchProducts } from "../../redux/async-actions/product.action"
import { deleteProductById } from "../../redux/async-actions/product.action"
const ProductTable = ({ dispatch, history, products }) => {
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  const columns = [
    {
      name: "_id",
      label: "Id",
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: "name",
      label: "Tên sản phẩm",
      option: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "image.path",
      label: "Hình ảnh",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (name) => {
          return (
            <>
              <img src={subDomain + "/" + name} alt="#product" width="130px" />
            </>
          )
        },
      },
    },
    {
      name: "detail",
      label: "Mô tả",
      options: {
        filter: false,
        sort: false,
        display: false,
      },
    },
    {
      name: "isNewOne",
      label: "Tình trạng",
      options: {
        customBodyRender: (name) => {
          return name ? "Mới" : "Cũ"
        },
      },
    },
    {
      name: "category.nameCategory",
      label: "Loại sản phẩm",
      options: {
        sort: false,
      },
    },
    {
      name: "brand.nameBrand",
      label: "Hãng",
      options: {
        sort: false,
      },
    },
    {
      name: "capacity.nameCapacity",
      label: "Công suất",
      options: {
        display: false,
        sort: false,
        filter: false,
      },
    },
    {
      name: "Thiết lập",
      options: {
        filter: false,
        sort: false,
        empty: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  history.push(`/products/${tableMeta.rowData[0]}`)
                }}
              >
                Cập nhật
              </Button>
              <Button
                style={{ marginLeft: "10px" }}
                variant="contained"
                color="secondary"
                onClick={() => {
                  dispatch(deleteProductById(`${tableMeta.rowData[0]}`))
                }}
              >
                Xóa
              </Button>
            </>
          )
        },
      },
    },
  ]

  const options = {
    selectableRows: "none",
    filterType: "dropdown",
  }

  return (
    <Fragment>
      <MUIDataTable
        className="mb-5"
        title={"Danh sách sản phẩm"}
        data={products ? products : undefined}
        columns={columns}
        options={options}
      />
    </Fragment>
  )
}
const mapStatToProps = (state) => {
  return {
    products: state.product.products,
  }
}
export default withRouter(connect(mapStatToProps)(ProductTable))
