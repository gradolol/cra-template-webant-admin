import React from 'react'
import {
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
  required,
  FormDataConsumer,
  Button,
} from 'react-admin'
import { ROLE_ADMIN } from '../../utils/constants'

const UserForm = (props) => {
  const checkPassword = (value, allValues) => {
    if (!value) return 'Введите пароль'
    return undefined
  }
  const checkRepeatPassword = (value, allValues) => {
    if (!value) return 'Повторите пароль'
    if (value !== allValues.plainPassword) {
      return 'Пароли не совпадают!'
    }
    return undefined
  }

  const [isHiddenPasswordFields, setHiddenPasswordFields] = React.useState(
    props.isEdit
  )

  return (
    <SimpleForm {...props}>
      <TextInput
        fullWidth={true}
        source="username"
        label="Логин"
        validate={required()}
      />
      <TextInput
        fullWidth={true}
        type="email"
        source="email"
        label="Email"
        validate={required()}
      />
      <TextInput
        fullWidth={true}
        source="phone"
        label="Телефон"
        validate={required()}
      />
      <TextInput
        fullWidth={true}
        source="fullName"
        label="ФИО"
        validate={required()}
      />
      {props.permissions === 'ROLE_ADMIN' ? (
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            return (
              !props.isEdit && (
                <SelectInput
                  fullWidth={true}
                  source="roles"
                  label="Роль"
                  choices={[{ id: ROLE_ADMIN, name: 'Администратор' }]}
                  parse={(v) => [v]}
                  format={(v) => {
                    if (Array.isArray(v)) {
                      return v[0]
                    }
                  }}
                  validate={required()}
                />
              )
            )
          }}
        </FormDataConsumer>
      ) : null}
      {props.isEdit && (
        <>
          {isHiddenPasswordFields ? (
            <Button
              onClick={(e) => {
                e.preventDefault()
                setHiddenPasswordFields(false)
              }}
              label="Сменить пароль"
            ></Button>
          ) : (
            <Button
              onClick={(e) => {
                e.preventDefault()
                setHiddenPasswordFields(true)
              }}
              label="Отменить"
              type="danger"
            ></Button>
          )}
        </>
      )}
      <FormDataConsumer>
        {({ formData, ...rest }) => {
          return !isHiddenPasswordFields ? (
            <PasswordInput
              fullWidth={true}
              source="plainPassword"
              label="Пароль"
              validate={checkPassword}
              inputProps={{ autocomplete: 'current-plainPassword' }}
            />
          ) : null
        }}
      </FormDataConsumer>
      <FormDataConsumer>
        {({ formData, ...rest }) => {
          return !isHiddenPasswordFields ? (
            <PasswordInput
              fullWidth={true}
              source="repeatPlainPassword"
              label="Повторите пароль"
              validate={checkRepeatPassword}
              inputProps={{ autocomplete: 'current-repeatPlainPassword' }}
            />
          ) : null
        }}
      </FormDataConsumer>
    </SimpleForm>
  )
}

export default UserForm
