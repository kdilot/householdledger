import axios from 'axios';

// const web = 'https://emptyboxhhl.herokuapp.com'
const web = ''

export const ApiGet = (url) => {
  return (
    axios.get(`${web}/api/${url}`)
  )
}

export const ApiPost = (url, param) => {
  return (
    axios.post(`${web}/api/${url}`, param)
  )
}