import axios from "axios"
export const domain ="http://localhost:9000"
export const restConnector = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || domain
})