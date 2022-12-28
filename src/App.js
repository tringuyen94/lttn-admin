import React, { Fragment } from "react"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import Main from "./Screens/Main"
import Navbar from "./Layouts/navbar"
import { Route, Switch, useLocation } from "react-router-dom"
import Authentication from "./Screens/Authentication"
import Categories from "./Screens/Categories"
import Footer from "./Layouts/footer"
import Brands from "./Screens/Brands"
import { ToastContainer, toast } from "react-toastify"
import DetailProduct from "./Screens/Products/detail.products"
import AuthProvider from "./context/AuthProvider"
import SideList from "./components/sidelist"
import { Grid } from "@material-ui/core"
import Products from "./Screens/Products/table.products"
import AddProduct from "./Screens/Products/add.product"
import NotFoundPage from "./Screens/NotFoundPage"
import Project from "./Screens/Project/project"
import AddProject from "./Screens/Project/add.project"
import DetailProject from "./Screens/Project/detail.project"
import Video from "./Screens/Video/Video"

function App() {
  const location = useLocation()


  return (
    <Fragment>
      {location.pathname === '/login' ? null : <Navbar />}
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={3000}
        hideProgressBar
      />
      <AuthProvider>
        <Grid container>
          {location.pathname === '/login' ? null : (<Grid item md={2} >
            <SideList />
          </Grid>)}
          <Grid item md={10}>
            <Switch>
              <Route path="/projects" exact component={Project} />
              <Route path="/projects/update-project/:projectId" exact component={DetailProject} />
              <Route path="/projects/add-project" exact component={AddProject} />
              <Route path="/products" exact component={Products} />
              <Route path="/products/add-product" exact component={AddProduct} />
              <Route path="/products/update-product/:productId" exact component={DetailProduct} />
              <Route path="/categories" exact component={Categories} />
              <Route path="/brands" exact component={Brands} />
              <Route path="/video" exact component={Video} />
              <Route path="/login" exact component={Authentication} />
              <Route path="/admin" exact component={Main} />
              <Route path="/" exact component={Main} />
              <Route path="*" exact component={NotFoundPage} />
            </Switch>
          </Grid>
        </Grid>
      </AuthProvider>
      {location.pathname === '/login' ? null : <Footer />}
    </Fragment>
  )
}

export default App
