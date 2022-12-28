import { restConnector } from "./baseURL.services"
class BrandServices {
  fetchBrands() {
    return restConnector({
      url: `api/brands/get-brands`,
      method: "get",
    })
  }
  addBrand(value) {
    return restConnector({
      url: `api/brands/create-brand`,
      method: "post",
      data: { nameBrand: value },
    })
  }
  updateBrandById(value, brandId) {
    return restConnector({
      url: `api/brands/update-brand-by-id/${brandId}`,
      method: "PUT",
      data: value,
    })
  }
}
export default new BrandServices()
