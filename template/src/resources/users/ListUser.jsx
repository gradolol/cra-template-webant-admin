import React from 'react'
import { ActionField } from '../../components/custom'
import { ListBulkActions } from '../../components'
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  Filter,
  FunctionField,
  ArrayField,
  SingleFieldList,
} from 'react-admin'

import { userRoles } from '../../utils/constants'

const UserFilters = (props) => (
  <Filter {...props}>
    <TextInput label="ФИО" source="fullName" />
    <TextInput label="Email" source="email" />
  </Filter>
)

const ListUser = (props) => {
  return (
    <List
      {...props}
      bulkActionButtons={
        props.permissions === 'ROLE_ADMIN' ? <ListBulkActions /> : false
      }
      title="Пользователи"
      exporter={false}
      filters={<UserFilters />}
    >
      <Datagrid rowClick="show">
        <TextField source="email" label="Эл. Почта" />
        <TextField source="fullName" label="ФИО" />

        <ArrayField source="roles" label="Роль">
          <SingleFieldList linkType={false}>
            <FunctionField render={(role) => (userRoles[role] || role) + ''} />
          </SingleFieldList>
        </ArrayField>
        {props.permissions === 'ROLE_ADMIN' ? (
          <ActionField label="Действия" />
        ) : null}
      </Datagrid>
    </List>
  )
}

export default ListUser
