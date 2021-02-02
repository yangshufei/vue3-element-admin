import fetch from 'utils/fetch'
import store from 'store'
import { param } from 'utils'

export function fetchData(sUrl, oParams) {
  if (!sUrl || sUrl === '') return

  return fetch.post(sUrl, oParams, {
    baseURL: store.getters.baseURL // baseURL
  })
}

export function fetchVoData(sUrl, oParams, option) {
  if (!sUrl || sUrl === '') return

  let config = {
    baseURL: store.getters.baseURL // baseURL
  }
  if (option) {
    config = Object.assign(config, option)
  }
  return fetch.post(sUrl, { data: oParams || {}}, config)
}

export function fetchPostData(sUrl, oParams, option) {
  if (!sUrl || sUrl === '') return

  let config = {
    baseURL: store.getters.baseURL, // baseURL
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  }

  const data = oParams
  if (option) {
    config = Object.assign(config, option)
  }
  return fetch.post(sUrl, data, config)
}

export function fetchGetData(sUrl, oParams, option) {
  if (!sUrl || sUrl === '') return

  if (oParams) {
    sUrl = sUrl + '?' + param(oParams)
  }

  let config = {
    baseURL: store.getters.baseURL // baseURL
  }
  if (option) {
    config = Object.assign(config, option)
  }

  return fetch.get(sUrl, config)
}

export function downFile(sUrl, oParams, option) {
  if (!sUrl || sUrl === '') return

  let config = {
    baseURL: store.getters.baseURL // baseURL
  }
  if (option) {
    config = Object.assign(config, option)
  }
  return fetch.post(sUrl, { data: oParams || {}}, config)
}
