import React from 'react'

const CustomImageField = ({ record }) => {
  let path
  if (record) {
    if (record.path) {
      path = `${process.env.REACT_APP_BASE_PATH}/uploads/${record.path}`
    } else {
      // если, при редактировании записи, в ней содержится изображение, она содержитсяв аттрибуте undefined
      path = record.undefined
    }
  }
  return path ? <img width={150} src={path} alt={record.name} /> : <></>
}

export default CustomImageField
