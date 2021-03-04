import React from 'react'
import { Create } from 'react-admin'
import UserForm from './UserForm'
import Toolbar from '../../components/FormToolbar'
import { configureDataBeforeRecord } from '../utils'

const CreateUser = (props) => {
  return (
    <Create
      {...props}
      toolbar={<Toolbar />}
      title="Создание пользователя"
      transform={configureDataBeforeRecord}
    >
      <UserForm {...props} />
    </Create>
  )
}

export default CreateUser
