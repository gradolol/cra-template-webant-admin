export function checkError({ data }, notify, translate, redirect) {
  if (data.error?.violations) {
    const errors = data.error.violations
    if (errors.length) {
      notify(translate(`ra.message.${errors[0].propertyPath}_already_exist`))
    }
  } else {
    redirect('/users')
  }
}
