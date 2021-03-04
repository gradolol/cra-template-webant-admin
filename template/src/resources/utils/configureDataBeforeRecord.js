import axios from 'axios'
import { textRegEx } from '../../utils/constants'

export async function configureDataBeforeRecord(data) {
  ;['description', 'title', 'name'].forEach((attr) => {
    if (data[attr]) data[attr] = data[attr].trim().replace(textRegEx, ' ')
  })

  for (let attr of ['file', 'image']) {
    if (data[attr]) {
      //Если файл уже существует в записи (при редактировании, просто назначаем свойству image ссылку (IRI) на файл)
      if (data[attr].id) {
        data[attr] = `/api/files/${data[attr].id}`
      }
      //Если файл загружаем новый, то следует сначала отправить его на сервер, получив ссылку на него (IRI)
      if (data[attr]?.rawFile) {
        data[attr] = await uploadFile(data[attr])
      }
    }
  }

  return data
}

async function uploadFile(field) {
  const fd = new FormData()
  fd.set('file', field.rawFile)
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_PATH}/api/files`,
      fd,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    return `/api/files/${response.data.id}`
  } catch (err) {
    Promise.reject(err)
  }
}

async function createLimit(data) {
  let obj = {}
  data.forEach((el) => {
    if (el.withLimits) {
      obj[el.faculty] = el.lim
    } else {
      obj[el.faculty] = 'kukuruza'
    }
  })
  return obj
}
