import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API
})

// api.interceptors.request.use(async config => {
//   // Pegue o token de onde você armazena (ex: localStorage)
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })
