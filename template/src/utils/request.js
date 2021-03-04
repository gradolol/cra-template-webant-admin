import axios from 'axios'

let requestQueue = []
let lastRequest = {}
let isPending = false

const authData = {
  client_id: process.env.REACT_APP_CLIENT_ID,
  client_secret: process.env.REACT_APP_CLIENT_SECRET,
}
const fullTokenUrl =
  process.env.REACT_APP_BASE_PATH + process.env.REACT_APP_TOKEN_PATH

export function refreshToken(refresh_token) {
  const params = Object.assign(authData, {
    ...authData,
    grant_type: 'refresh_token',
    refresh_token,
  })
  try {
    return axios({
      url: fullTokenUrl,
      method: 'get',
      params,
    })
  } catch {
    isPending = false
    return Promise.reject()
  }
}

export const instance = axios.create()

// Добавление хедеров перед запросом

instance.interceptors.request.use(
  (config) => {
    config.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`
    }
    return config
  },
  (error) => {
    console.error('Error on request, ', error)
    return Promise.reject(error)
  }
)

// Обработка после запроса
instance.interceptors.response.use(
  (response) => {
    lastRequest = {}
    return response
  },
  async (error) => {
    const is401Error = error.response?.status === 401
    if (is401Error) {
      const isAccessDenied = error.response?.data.error === 'access_denied'
      if (isAccessDenied) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
      }

      if (!isPending) {
        isPending = true
        const refresh_token = localStorage.getItem('refresh_token')
        refreshToken(refresh_token)
          .then((response) => {
            localStorage.setItem('access_token', response?.data?.access_token)
            localStorage.setItem('refresh_token', response?.data?.refresh_token)
            isPending = false
            resendPendingRequests()
          })
          .catch((e) => {
            localStorage.clear()
          })
      }

      return new Promise((resolve, reject) => {
        lastRequest.resolve = resolve
        lastRequest.reject = reject
        requestQueue.push({ resolve, reject, config: error.config })
      })
    } else {
      if (error.response?.status === 403) {
        return Promise.reject('У вас нет прав на это действие')
      }
      console.error('Error on response, ', error)
      return Promise.reject(error)
    }
  }
)

function resendPendingRequests() {
  requestQueue.forEach(async (deferredRequest) => {
    const config = deferredRequest.config
    const resolve = deferredRequest.resolve
    try {
      const response = await instance(config)
      resolve(response)
    } catch (error) {
      Promise.reject()
      console.error(`errResolve ${error}`)
    }
  })
  requestQueue = []
}

const serviceDecorator = (config) => {
  const tokenPath = process.env.APP_TOKEN_PATH || ''
  const isChecking = config.url.indexOf(tokenPath) === -1

  if (isPending && isChecking) {
    return new Promise((resolve, reject) => {
      requestQueue.push({ config, resolve, reject })
    })
  }

  return new Promise(async (resolve, reject) => {
    if (isChecking) {
      lastRequest = { config, resolve, reject }
    }
    try {
      const response = await instance(config)
      resolve(response)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

export default serviceDecorator
