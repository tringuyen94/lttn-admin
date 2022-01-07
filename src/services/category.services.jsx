import { restConnector } from "./baseURL.services"
class CategoryServices {
  fetchCategories() {
    return restConnector({
      url: `api/categories`,
      method: "get",
    })
  }
  addCategory(value) {
    return restConnector({
      url: `api/categories/create-category`,
      method: "post",
      data: { 'nameCategory': value },
    })
  }
  updateCategoryById(value, categoryId) {
    return restConnector({
      url: `api/categories/update-category-by-id/${categoryId}`,
      method: "PUT",
      data: value,
    })
  }
}
export default new CategoryServices()
