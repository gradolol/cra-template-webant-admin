import { stringify } from 'query-string'
import { fetchUtils } from 'ra-core'
import request from './request'

export default (apiUrl) => ({
  getList: async (resource, params) => {
    const { page, perPage } = params?.pagination || { page: 1, perPage: 20 }
    const { field, order } = params?.sort || { field: 'id', order: 'ASC' }
    let orderParam = `order[${field}]`
    const { filter } = params

    //if our filter params have '.' in name we need to parse it
    //uncomment if you want this feature

    // if (filter) {
    //   Object.keys(filter).forEach((key) => {
    //     if (key.includes('->')) {
    //       filter[key.replace('->', '.')] = filter[key]
    //       delete filter[key]
    //     }
    //   })
    // }

    const query = {
      page: page,
      limit: perPage,
      ...params.filter,
    }

    //sort default by id
    if (order && orderParam) {
      query[orderParam] = order
    } else {
      query['order[id]'] = 'desc'
    }

    const url = `${apiUrl}/${resource}?${stringify(query || '')}`
    try {
      const response = await request({ url: url })
      return {
        data: response.data.items,
        total: response.data.totalItems,
      }
    } catch (err) {
      return Promise.reject(err)
    }
  },

  getOne: async (resource, params) => {
    if (resource === 'students') {
      resource = 'users'
    }
    try {
      const response = await request({
        url: `${apiUrl}/${resource}/${params.id}`,
      })
      return { data: response.data }
    } catch (err) {
      return Promise.reject(err)
    }
  },

  getMany: async (resource, params) => {
    const items = []
    try {
      for (const id of params.ids) {
        const url = `${apiUrl}/${resource}/${id}`
        const response = await request({ url })
        items.push(response.data)
      }
      return { data: items }
    } catch (err) {
      return Promise.reject(err)
    }
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination
    const query = {
      ...fetchUtils.flattenObject(params.filter),
      page: page,
      limit: perPage,
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`
    try {
      const response = await request({ url })
      return {
        data: response.data.items,
        total: response.data.totalItems,
      }
    } catch (err) {
      Promise.reject(err)
    }
  },

  update: async (resource, params) => {
    try {
      const response = await request({
        url: `${apiUrl}/${resource}/${params.id}`,
        method: 'PUT',
        data: params.data,
      })
      if (response?.response?.status === 500) {
        return Promise.reject(response.response.data.detail)
      }
      return {
        data: {
          ...response.data,
          id: response.data.id ? response.data.id : 0,
          error: response.data.error,
        },
      }
    } catch (err) {
      if (typeof err === 'string') {
        return Promise.reject(err)
      }
      if (err.response.data.violations) {
        const errors = err.response.data.violations
        if (errors.length) {
          return Promise.reject(
            `${errors[0].propertyPath}: ${errors[0].message}`
          )
        }
      } else {
        return Promise.reject(err.response.data.detail)
      }
    }
  },

  // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
  updateMany: async (resource, params) => {
    const responses = await Promise.all(
      params.ids.map((id) =>
        request({
          url: `${apiUrl}/${resource}/${id}`,
          method: 'PUT',
          data: params.data,
        })
      )
    )
    return { data: responses.map(({ data }) => data.id) }
  },

  create: async (resource, params) => {
    try {
      const response = await request({
        url: `${apiUrl}/${resource}`,
        method: 'POST',
        data: params.data,
      })
      if (response instanceof Error) {
        response.message = response.response.detail
        return Promise.reject(response)
      }
      return {
        data: {
          ...params.data,
          id: response.data?.id,
          error: response.data.error ? response.data.error : null,
        },
      }
    } catch (err) {
      if (typeof err === 'string') {
        return Promise.reject(err)
      }
      if (err.response.data.violations) {
        const errors = err.response.data.violations
        if (errors.length) {
          return Promise.reject(
            `${errors[0].propertyPath}: ${errors[0].message}`
          )
        }
      } else {
        return Promise.reject(err.response.data.detail)
      }
    }
  },

  delete: async (resource, params) => {
    try {
      const response = await request({
        url: `${apiUrl}/${resource}/${params.id}`,
        method: 'DELETE',
      })
      // Ошибка не падает в catch
      if (response instanceof Error) {
        response.message = response.response.data.detail
        return Promise.reject(response)
      }
      return { data: response.data }
    } catch (err) {
      Promise.reject(err)
    }
  },

  // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: async (resource, params) => {
    try {
      await Promise.all(
        params.ids.map(
          async (id) =>
            await request({
              url: `${apiUrl}/${resource}/${id}`,
              method: 'DELETE',
            })
        )
      )
      return { data: { ids: params.ids } }
    } catch (err) {
      return Promise.reject(err)
    }
  },
})
