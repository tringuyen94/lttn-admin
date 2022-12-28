import React, { useEffect } from "react"
import MUIDataTable from "mui-datatables"
import { Button } from "@material-ui/core"
import { Delete } from "@material-ui/icons"
import CircularProgress from '@material-ui/core/CircularProgress';
import { fetchProducts } from "../../redux/async-actions/product.action"
import { deleteProductById } from "../../redux/async-actions/product.action"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"


const Products = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const products = useSelector(state => state.product.products)
  const loadingProd = useSelector(state => state.product.loading)
  const options = {
    selectableRows: "none",
    filterType: "dropdown",
    rowsPerPage: 5
  }


  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


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
      name: "productImages",
      label: "Hình ảnh",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (name) => {
          return (
            <img
              src={name[0]?.url}
              alt="product"
              width="100px"
              height="100px"
            />
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
      name: "isNewProduct",
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
                onClick={() => history.push(`/products/update-product/${tableMeta.rowData[0]}`)}
              >
                Cập nhật
              </Button>
              <Button
                size="small"
                variant="contained"
                style={{ marginLeft: "10px" }}
                color="secondary"
                onClick={() => {
                  dispatch(deleteProductById(`${tableMeta.rowData[0]}`))
                }}
              >
                {loadingProd ? <CircularProgress /> : "Xoá"}
              </Button>
            </>
          )
        },
      },
    },
  ]

  return (
    <MUIDataTable
      className="table__products"
      title={"Danh sách sản phẩm"}
      data={products ? products : undefined}
      columns={columns}
      options={options}
    />
  )
}

export default Products
