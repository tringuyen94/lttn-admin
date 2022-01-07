import React from "react"
import {
  Grid, Card,
  CardActionArea,
  Typography, CardContent
} from '@material-ui/core'
import './main.css'
import { useHistory } from "react-router"

const Main = () => {
  const history = useHistory()
  return (
    <Grid container justify='space-between' className="main">
      <Grid item md={4}>
        <Card className='main__card'>
          <CardActionArea onClick={() =>history.push('/products')}>
            <img alt="product" src={require('../../img/product.jpg')} />
            <CardContent className='card__content'>
              <Typography gutterBottom variant="h5" align='center' component="h2">
                Sản phẩm
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card className='main__card'>
          <CardActionArea onClick={() =>history.push('/categories')} >
            <img alt="category" src={require('../../img/category.png')} />
            <CardContent className='card__content'>
              <Typography gutterBottom variant="h5" align='center' component="h2">
                Loại sản phẩm
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
      <Grid item md={4}>
        <Card className='main__card'>
          <CardActionArea onClick={() =>history.push('/brands')}>
            <img alt="brand" src={require('../../img/brand.jpg')} />
            <CardContent className='card__content'>
              <Typography gutterBottom variant="h5" align='center' component="h2">
                Nhãn hàng
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Main
