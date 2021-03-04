import * as React from 'react'
import { useMutation, useNotify, Button } from 'react-admin'

const ApproveButton = ({ record, refresh }) => {
  const notify = useNotify()
  const [approve, { loading }] = useMutation(
    {
      type: 'update',
      resource: 'event_user_candidates',
      payload: { id: record.id, data: { status: 1 } },
    },
    {
      onSuccess: ({ data }) => {
        notify('Участник потвержден')
        refresh()
      },
      onFailure: (error) => notify(`Ошибка сервера`, 'warning'),
    }
  )

  return <Button label="Принять" onClick={approve} disabled={loading} />
}

export default ApproveButton
