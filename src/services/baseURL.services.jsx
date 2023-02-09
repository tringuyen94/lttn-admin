import axios from "axios"

// export const domain = "http://localhost:9000"
export const domain = 'http://lttnelectric.com:9000'

export const restConnector = axios.create({
  baseURL: domain
})