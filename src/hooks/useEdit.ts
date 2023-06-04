import { useState } from 'react'

const useEdit = <T>() => {
  useState
  const [isOpenForm, setIsOpenForm] = useState(false)
  const [entity, setEntity] = useState<T>()

  const onOpenForm = () => setIsOpenForm(true)
  const onCloseForm = () => setIsOpenForm(false)
  return { isOpenForm, onOpenForm, onCloseForm, entity, setEntity }
}

export default useEdit
