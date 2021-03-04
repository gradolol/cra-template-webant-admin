import axios from 'axios'

const client_id = process.env.REACT_APP_CLIENT_ID
const client_secret = process.env.REACT_APP_CLIENT_SECRET
const grant_type = 'password'

export default {
  login: async ({ username, password }) => {
    let response = {}
    try {
      response = await axios(
        `${process.env.REACT_APP_BASE_PATH}/oauth/v2/token`,
        {
          method: 'GET',
          params: { username, password, client_secret, client_id, grant_type },
          headers: new Headers({ 'Content-Type': 'application/json' }),
        }
      )
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
    } catch (err) {
      if (err.response.status === 400) {
        throw new Error('Неверный логин или пароль')
      } else if (err.response.status === 500) {
        throw new Error('Ошибка сервера. Повторите попытку позже')
      }
    }
    try {
      const current = await axios(
        `${process.env.REACT_APP_BASE_PATH}/api/users/current`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${response.data.access_token}` },
        }
      )

      localStorage.setItem('ROLE', current.data.roles[0])
      localStorage.setItem('userId', current.data.id)
      return Promise.resolve(current)
    } catch (err) {
      if (err.response.status === 400) {
        throw new Error('Ошибка после авторизации')
      } else if (err.response.status === 500) {
        throw new Error('Ошибка сервера. Повторите попытку позже')
      }
    }
  },

  checkAuth: () =>
    localStorage.getItem('access_token') ? Promise.resolve() : Promise.reject(),
  checkError: (error) => {
    return Promise.resolve(error)
  },
  getIdentity: async () => {
    try {
      const current = await axios(
        `${process.env.REACT_APP_BASE_PATH}/api/users/current`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      )
      return Promise.resolve({
        id: current.data.id,
        fullName: current.data.fullName,
      })
    } catch (error) {
      return Promise.reject(error)
    }
  },
  getPermissions: (params) => {
    const role = localStorage.getItem('ROLE')
    return role ? Promise.resolve(role) : Promise.reject()
  },
  logout: () => {
    localStorage.clear()
    return Promise.resolve()
  },
}
