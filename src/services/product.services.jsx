import { restConnector } from "./baseURL.services"
class ProductServices {
  createProduct(value) {
    return restConnector({
      url: `api/products/create-product`,
      method: "POST",
      data: value,
    })
  }
  fetchProducts() {
    return restConnector({
      url: `api/products/get-products`,
      method: "GET",
    })
  }
  fetchProductById(productId) {
    return restConnector({
      url: `api/products/get-product-by-id/${productId}`,
      method: "GET",
    })
  }
  deleteProductById(productId) {
    return restConnector({
      url: `api/products/delete-product/${productId}`,
      method: "DELETE",
    })
  }
  updateProductById(productData, productId) {
    return restConnector({
      url: `api/products/update-product/${productId}`,
      method: "PUT",
      data: productData,
    })
  }
  updateImageProduct(productData, productId) {
    return restConnector({
      url: `api/products/update-image/${productId}`,
      method: "PUT",
      data: productData,
    })
  }
}
export default new ProductServices()
