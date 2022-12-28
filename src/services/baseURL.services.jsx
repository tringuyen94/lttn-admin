import axios from "axios"

// export const domain = "http://localhost:9000"
export const domain = "http://api.lttnelectric.com"

export const restConnector = axios.create({
  baseURL: domain
})