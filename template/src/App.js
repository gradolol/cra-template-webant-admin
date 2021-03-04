import React from 'react'
import { Admin, Resource } from 'react-admin'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import { webantDataProvider, authProvider, russianMessages } from './utils'
import { ListUser, CreateUser, EditUser, ShowUser } from './resources/users'
import { defaultTheme } from 'react-admin'
import merge from 'lodash/merge'

import { lightTheme } from './utils/themes'

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru')

const myTheme = merge({}, defaultTheme, lightTheme)

const App = () => {
  return (
    <Admin
      dataProvider={webantDataProvider(
        `${process.env.REACT_APP_BASE_PATH}/api`
      )}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
      theme={myTheme}
    >
      {(permissions) => [
        permissions === 'ROLE_ADMIN' ? (
          <Resource
            name="users"
            options={{ label: 'Администраторы' }}
            list={ListUser}
            create={CreateUser}
            edit={EditUser}
            show={ShowUser}
            icon={PermContactCalendarIcon}
          />
        ) : (
          <Resource
            name="users"
            options={{ label: 'Администраторы' }}
            list={ListUser}
            show={ShowUser}
            create={CreateUser}
            icon={PermContactCalendarIcon}
          />
        ),
      ]}
    </Admin>
  )
}

export default App
