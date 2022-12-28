import React, { useEffect } from "react"
import { Grid, Typography, } from '@material-ui/core'
import CountUp from 'react-countup';
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "../../redux/async-actions/product.action"
import { fetchProjects } from "../../redux/async-actions/project.action";
import './main.css'


const Main = () => {
  const dispatch = useDispatch()
  const products = useSelector(state => state.product.products)
  const projects = useSelector(state => state.project.projects)
  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(fetchProjects())
  }, [dispatch])
  return (
    <Grid container justify='space-between' className="main">
      <Grid item md={6} >
        <Typography variant="h6">Tổng sản phẩm</Typography>
        {products ?
          <Typography variant="h3">
            <CountUp end={products.length} />
          </Typography>
          : null}
      </Grid>
      <Grid item md={6}>
        <Typography variant="h6">Tổng số dự án</Typography>
        {projects ?
          <Typography variant="h3">
            <CountUp end={projects.length} />
          </Typography>
          : null}
      </Grid>
    </Grid>
  )
}

export default Main
