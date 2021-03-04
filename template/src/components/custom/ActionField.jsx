import React from 'react'
import { EditButton, DeleteButton } from 'react-admin'

const ActionField = (props) => (
  <>
    <EditButton {...props} label={null} />
    <DeleteButton {...props} label={null} undoable={false} />
  </>
)

export default ActionField
