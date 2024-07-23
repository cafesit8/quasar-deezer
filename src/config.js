import axios from 'axios'

export const axiosApi = axios.create({
  baseURL: 'https://deezerdevs-deezer.p.rapidapi.com',
  headers: {
    'x-rapidapi-key': '699ccbe935msh4774dd4109a3b27p1ba933jsn0c13a6f6672b',
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
  }
})
