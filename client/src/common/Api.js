import axios from 'axios';

export const ApiGet = (url) => {
  return (
    axios.get(`/api/${url}`)
  )
}

export const ApiPost = (url, param) => {
  return (
    axios.post(`/api/${url}`, param)
  )
}