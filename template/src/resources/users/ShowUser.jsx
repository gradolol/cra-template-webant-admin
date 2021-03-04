import React from 'react'
import {
  Show,
  SimpleShowLayout,
  Tab,
  TextField,
  ArrayField,
  SingleFieldList,
  FunctionField,
} from 'react-admin'
import { userRoles } from '../../utils/constants'

const UserTitle = ({ record }) => {
  return <span>{record.name ? record.name : ''}</span>
}

const ShowUser = (props) => {
  return (
    <Show {...props} title={<UserTitle />}>
      <SimpleShowLayout>
        <TextField source="username" label="Логин" />
        <TextField source="fullName" label="ФИО" />
        <TextField source="email" label="Email" />
        <TextField source="phone" label="Телефон" />
        <ArrayField source="roles" label="Роль">
          <SingleFieldList linkType={false}>
            <FunctionField render={(role) => (userRoles[role] || role) + ''} />
          </SingleFieldList>
        </ArrayField>
      </SimpleShowLayout>
    </Show>
  )
}

export default ShowUser
