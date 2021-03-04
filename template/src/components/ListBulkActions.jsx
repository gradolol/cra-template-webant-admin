import React from 'react'
import {
  useDataProvider,
  useRefresh,
  useUnselectAll,
  Button,
} from 'react-admin'
import ActionDelete from '@material-ui/icons/Delete'

const ListBulkActions = (props) => {
  const { selectedIds, resource } = props

  const dataProvider = useDataProvider()
  const refresh = useRefresh()
  const unselectAll = useUnselectAll()

  const buttonColor = { color: '#f44336' }

  const handleDelete = async () => {
    try {
      await dataProvider.deleteMany(resource, { ids: selectedIds })
      refresh()
      unselectAll(resource)
    } catch (err) {
      Promise.reject(err)
    }
  }

  return (
    <>
      <Button onClick={() => handleDelete()}>
        <ActionDelete style={buttonColor} />
      </Button>
    </>
  )
}

export default ListBulkActions
