import { useCallback, useState, useContext } from 'react'
import SimpleMdeReact from 'react-simplemde-editor'
import { NoteContext } from '../App'
import { NoteFE, NoteBE } from '../models/note-types'

export type NoteFormType = {}
export type NoteFormProps = {
  data?: NoteFE
}

export function NoteForm({ data }: NoteFormProps) {
  const { text } = data as NoteFE
  const [value, setValue] = useState<string>(text)
  const { setNoteToUpdate } = useContext(NoteContext)

  const onChange = useCallback((value: string): void => {
    const note = { ...data, text: value } as NoteFE

    if (setNoteToUpdate) {
      setNoteToUpdate(note)
    }

    setValue(value)
  }, [])

  return <SimpleMdeReact value={value} onChange={onChange} />
}
