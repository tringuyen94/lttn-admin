import axios from "axios"
export const domain ="http://45.90.109.181"
export const subDomain= "http://lttnelectric.com:9000"
export const restConnector = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || domain
})