import axios from 'axios'
// import queryString from 'query-string'

const axiosClient = axios.create({
  baseURL: 'https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    apiKey: 'c7b411cc-0e7c-4ad1-aa3f-822b00e7734b',
  },
})

axiosClient.interceptors.request.use(async (config) => config)

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data
    }

    return response
  },
  (error) => {
    throw error
  }
)

export default axiosClient
