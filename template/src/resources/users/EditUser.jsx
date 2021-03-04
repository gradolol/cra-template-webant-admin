import React from 'react'
import { Edit } from 'react-admin'
import UserForm from './UserForm'
import Toolbar from '../../components/FormToolbar'

const EditUser = (props) => {
  return (
    <Edit
      {...props}
      toolbar={<Toolbar />}
      title="Редактирование пользователя"
      undoable={false}
    >
      <UserForm {...props} isEdit={true} />
    </Edit>
  )
}

export default EditUser
